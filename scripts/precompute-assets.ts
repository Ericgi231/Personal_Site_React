import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage, ImageData } from 'canvas';

const ASSET_ROOT = path.resolve('public/assets/animal-race-bets');
const ASSET_TYPES = ['animals', 'tracks', 'objects', 'intermissions'];
const ASSETS_TS_OUT = path.resolve('shared/src/animal-race-bets/data/asset-data.generated.ts');

function getMask(imageData: ImageData, alphaThreshold: number = 128) {
  let mask = '';
  for (let y = 0; y < imageData.height; ++y) {
    for (let x = 0; x < imageData.width; ++x) {
      const idx = (y * imageData.width + x) * 4 + 3;
      mask += imageData.data[idx] > alphaThreshold ? '1' : '0';
    }
  }
  return mask;
}

function scanAssetFolders(assetType: string) {
  const typeDir = path.join(ASSET_ROOT, assetType);
  if (!fs.existsSync(typeDir)) return [];
  return fs.readdirSync(typeDir).filter(f => fs.statSync(path.join(typeDir, f)).isDirectory());
}

async function processSprite(spriteFile: string) {
  const img = await loadImage(spriteFile);
  const w = img.width;
  const h = img.height;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  const imageData = ctx.getImageData(0, 0, w, h);
  return {
    width: w,
    height: h,
    mask: getMask(imageData)
  };
}

function readConfig(configPath: string) {
  if (!fs.existsSync(configPath)) return null;
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

async function main() {

  const assetMaps: Record<string, Record<string, any>> = {
    animals: {}, tracks: {}, objects: {}, intermissions: {}
  };

  for (const assetType of ASSET_TYPES) {
    const assetIds = scanAssetFolders(assetType);
    for (const assetId of assetIds) {
      const assetDir = path.join(ASSET_ROOT, assetType, assetId);
      const configPath = path.join(assetDir, 'config.json');
      const config = readConfig(configPath);
      if (config) {
        assetMaps[assetType][assetId] = config;
      }
      // Only animals, tracks, objects have sprite.png
      if (['animals', 'tracks', 'objects'].includes(assetType)) {
        const spritePath = path.join(assetDir, 'sprite.png');
        if (fs.existsSync(spritePath)) {
          const maskObj = await processSprite(spritePath);
          // Write mask.json per asset
          const maskJsonPath = path.join(assetDir, 'mask.json');
          fs.writeFileSync(maskJsonPath, JSON.stringify(maskObj));
        }
      }
    }
  }

  // Write assets.ts with type imports and annotations
  let tsOut = '';
  tsOut += `import { IntermissionData, AnimalData, TrackData, ObjectData } from '../types/index';\n\n`;
  for (const assetType of ASSET_TYPES) {
    let typeAnn = '';
    let mapName = assetType.toUpperCase().replace(/S$/, '') + '_MAP';
    if (assetType === 'animals') typeAnn = ': Record<string, AnimalData>';
    else if (assetType === 'tracks') typeAnn = ': Record<string, TrackData>';
    else if (assetType === 'intermissions') typeAnn = ': Record<string, IntermissionData>';
    else if (assetType === 'objects') typeAnn = ': Record<string, ObjectData>';
    else typeAnn = ': Record<string, any>';
    tsOut += `export const ${mapName}${typeAnn} = ${JSON.stringify(assetMaps[assetType], null, 2)} as const;\n\n`;
  }
  fs.writeFileSync(ASSETS_TS_OUT, tsOut);
}

main();