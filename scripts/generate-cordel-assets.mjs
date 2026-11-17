import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const ROOT_DIR = process.cwd();
const PUBLIC_ASSETS_DIR = path.join(ROOT_DIR, 'public', 'assets');
const BRAND_DIR = path.join(PUBLIC_ASSETS_DIR, 'brand');
const BOWLS_DIR = path.join(PUBLIC_ASSETS_DIR, 'bowls');
const CORDEL_DIR = path.join(PUBLIC_ASSETS_DIR, 'cordel');

const OFFICIAL_UPLOAD_BASE =
  'https://www.altitudeacai.com/uploads/b/52f626134a279b273bf3535d713888543adce4234f67002f386a0a546714fb6c';

const OFFICIAL_ASSETS = [
  {
    remoteName: 'Apple%20App%20Store_1768852044.jpg',
    outDir: BRAND_DIR,
    outName: 'logo-official.webp',
    width: 800,
    height: 800,
    fit: 'contain',
    trim: true,
    background: { r: 250, g: 250, b: 255, alpha: 1 },
    quality: 86,
  },
  {
    remoteName: '4bb716e8-589d-4629-92fc-d976ae926ecd_1768853478.jpg',
    outDir: BOWLS_DIR,
    outName: 'official-overhead-spread.webp',
    width: 1000,
    height: 1000,
    fit: 'cover',
    quality: 80,
  },
  {
    remoteName: 'IMG_4447_1776966816.jpeg',
    outDir: BOWLS_DIR,
    outName: 'official-cody-bench-duo.webp',
    width: 1200,
    height: 900,
    fit: 'cover',
    quality: 80,
  },
  {
    remoteName: 'IMG_4422_1776966806.jpeg',
    outDir: BOWLS_DIR,
    outName: 'official-window-seeds-bowl.webp',
    width: 1200,
    height: 900,
    fit: 'cover',
    quality: 80,
  },
  {
    remoteName: 'IMG_4348_1776966796.jpeg',
    outDir: BOWLS_DIR,
    outName: 'official-berry-pollen-bowl.webp',
    width: 1200,
    height: 900,
    fit: 'cover',
    quality: 80,
  },
  {
    remoteName: 'IMG_0990_1793411261.png',
    outDir: BRAND_DIR,
    outName: 'official-winter-hours-poster.webp',
    width: 800,
    height: 1200,
    fit: 'inside',
    quality: 82,
  },
  {
    remoteName: 'IMG_0991_1794279795.PNG',
    outDir: BRAND_DIR,
    outName: 'official-thanksgiving-notice.webp',
    width: 900,
    height: 900,
    fit: 'inside',
    quality: 82,
  },
  {
    remoteName: 'IMG_1090_1794279629.PNG',
    outDir: BRAND_DIR,
    outName: 'official-veterans-notice.webp',
    width: 800,
    height: 1200,
    fit: 'inside',
    quality: 82,
  },
];

const GEMINI_PROMPTS = [
  {
    outDir: BRAND_DIR,
    outName: 'hero-cordel-landscape.webp',
    width: 1440,
    height: 810,
    aspectRatio: '16:9',
    prompt:
      'Brazilian Cordel woodcut printmaking (xilogravura) blended with Wyoming Absaroka mountain landscape at dawn, dramatic carved indigo and ghost-white mountain ridges, rising crescent sun rays, botanical acai palm berry branches framing the foreground, fine cotton paper texture, strictly monochrome indigo ink palette #1E2749, #273469, #575E8F, #8687B4, #E4D9FF, #FAFAFF, #30343F, zero text, zero watermarks, printmaker editorial illustration.',
  },
  {
    outDir: BRAND_DIR,
    outName: 'cordel-ingredients-woodcut.webp',
    width: 1200,
    height: 800,
    aspectRatio: '3:2',
    prompt:
      'Authentic Brazilian Cordel xilogravura woodcut botanical engraving sheet on cotton paper, featuring carved strawberries, bananas, blueberries, blackberries, raspberries, pineapple, scored mango, wooden honey dipper with honeycomb, rolled oat granola, coconut shavings, pumpkin seeds, and almonds, printed solely in deep space indigo #1E2749 and twilight indigo #273469 ink on soft ghost white #FAFAFF cotton paper with periwinkle #E4D9FF paper block highlights, zero text or letters.',
  },
];

const MAX_WEBP_BYTES = 150 * 1024;

/**
 * Loads environment variables silently into process.env without logging values.
 */
async function loadDotEnvSilently() {
  if (typeof process.loadEnvFile === 'function') {
    try {
      process.loadEnvFile(path.join(ROOT_DIR, '.env'));
      return;
    } catch {
      // Fall back to manual silent parse if .env is missing or unreadable
    }
  }
  try {
    const raw = await fs.readFile(path.join(ROOT_DIR, '.env'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx <= 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  } catch {
    // No .env file present; rely on ambient environment if configured
  }
}

/**
 * Encodes an image buffer to WebP ensuring output stays under MAX_WEBP_BYTES.
 */
export async function optimizeBufferToWebp(inputBuffer, outPath, options) {
  let quality = options.quality ?? 82;
  let width = options.width;
  let height = options.height;

  for (let attempt = 0; attempt < 6; attempt++) {
    let pipeline = sharp(inputBuffer).rotate();
    if (options.trim) {
      pipeline = pipeline.trim({ threshold: 10 });
    }
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: options.fit ?? 'cover',
        withoutEnlargement: true,
        background: options.background ?? { r: 250, g: 250, b: 255, alpha: 1 },
      });
    }
    const output = await pipeline
      .webp({ quality, effort: 6, smartSubsample: true })
      .toBuffer();

    if (output.length <= MAX_WEBP_BYTES || attempt === 5) {
      await fs.mkdir(path.dirname(outPath), { recursive: true });
      await fs.writeFile(outPath, output);
      return output.length;
    }

    quality = Math.max(54, quality - 7);
    if (width && height && output.length > MAX_WEBP_BYTES * 1.15) {
      width = Math.round(width * 0.88);
      height = Math.round(height * 0.88);
    }
  }
  return 0;
}

async function downloadAndOptimizeOfficialAssets() {
  console.log('Downloading and optimizing official Altitude Acai media assets...');
  const results = [];

  for (const item of OFFICIAL_ASSETS) {
    const url = `${OFFICIAL_UPLOAD_BASE}/${item.remoteName}`;
    const outPath = path.join(item.outDir, item.outName);
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!response.ok) {
      throw new Error(`Failed to fetch official asset (${item.outName}): HTTP ${response.status}`);
    }
    const rawBuffer = Buffer.from(await response.arrayBuffer());
    const finalBytes = await optimizeBufferToWebp(rawBuffer, outPath, item);
    results.push({ file: path.relative(ROOT_DIR, outPath), bytes: finalBytes });
    console.log(`  [OK] ${item.outName} -> ${(finalBytes / 1024).toFixed(1)} KB`);
  }

  return results;
}

async function generateViaGeminiApi(item, apiKey) {
  const endpoint =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: item.prompt }] }],
      generationConfig: {
        responseModalities: ['IMAGE'],
      },
    }),
  });

  if (!res.ok) {
    return { ok: false, status: res.status };
  }
  const payload = await res.json();
  const imagePart = payload?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data);
  const base64 = imagePart?.inlineData?.data;
  if (!base64) {
    return { ok: false, status: 500 };
  }
  const imgBuffer = Buffer.from(base64, 'base64');
  const outPath = path.join(item.outDir, item.outName);
  const bytes = await optimizeBufferToWebp(imgBuffer, outPath, item);
  return { ok: true, bytes, file: path.relative(ROOT_DIR, outPath) };
}

async function optimizeExistingPngDirectory(sourceDir, mappings) {
  for (const map of mappings) {
    const srcPath = path.join(sourceDir, map.srcName);
    try {
      const buf = await fs.readFile(srcPath);
      const outPath = path.join(map.outDir, map.outName);
      const bytes = await optimizeBufferToWebp(buf, outPath, map);
      console.log(`  [WEBP] ${map.outName} -> ${(bytes / 1024).toFixed(1)} KB`);
    } catch {
      console.log(`  [SKIP] ${map.srcName} not found in ${sourceDir}`);
    }
  }
}

async function main() {
  await fs.mkdir(BRAND_DIR, { recursive: true });
  await fs.mkdir(BOWLS_DIR, { recursive: true });
  await fs.mkdir(CORDEL_DIR, { recursive: true });

  const args = new Set(process.argv.slice(2));

  if (args.has('--optimize-dir')) {
    const dirArg = process.argv[process.argv.indexOf('--optimize-dir') + 1];
    if (!dirArg) {
      throw new Error('Missing directory path after --optimize-dir');
    }
    const entries = await fs.readdir(dirArg);
    const mappings = entries
      .filter((name) => /\.(png|jpe?g)$/i.test(name))
      .map((name) => ({
        srcName: name,
        outDir: name.startsWith('bowl-') ? BOWLS_DIR : BRAND_DIR,
        outName: name.replace(/\.(png|jpe?g)$/i, '.webp'),
        width: name.startsWith('bowl-') ? 960 : 1280,
        height: name.startsWith('bowl-') ? 960 : 720,
        fit: 'cover',
        quality: 80,
      }));
    await optimizeExistingPngDirectory(dirArg, mappings);
    return;
  }

  await downloadAndOptimizeOfficialAssets();

  if (args.has('--try-gemini')) {
    await loadDotEnvSilently();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log('GEMINI_API_KEY not configured; use image-generator fallback.');
      return;
    }
    for (const item of GEMINI_PROMPTS) {
      try {
        const res = await generateViaGeminiApi(item, apiKey);
        if (res.ok) {
          console.log(`  [GEMINI] ${item.outName} -> ${(res.bytes / 1024).toFixed(1)} KB`);
        } else {
          console.log(`  [FALLBACK] Gemini returned HTTP ${res.status} for ${item.outName}; use image-generator fallback.`);
        }
      } catch {
        console.log(`  [FALLBACK] Gemini request unavailable for ${item.outName}; use image-generator fallback.`);
      }
    }
  }
}

const isCliEntry =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isCliEntry) {
  main().catch((err) => {
    console.error('Asset pipeline failed:', err?.message ?? 'Unknown error');
    process.exit(1);
  });
}
