const fs = require("node:fs");
const path = require("node:path");
const XLSX = require("xlsx");

const root = path.resolve(__dirname, "..");

function readWorkbook(name) {
  return XLSX.readFile(path.join(root, name), { cellDates: false });
}

function rows(sheet) {
  return XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
}

function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function uniqBy(items, key) {
  const seen = new Set();
  return items.filter((item) => {
    const value = key(item);
    if (!value || seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

const shopee = readWorkbook("Shopee Admin Fee Calculator.xlsx");
const adminRows = rows(shopee.Sheets["Biaya Administrasi"]);
const adminCategories = uniqBy(
  adminRows.slice(3).map((row) => ({
    group: String(row[0] || "").trim(),
    name: String(row[1] || "").trim(),
    detail: String(row[2] || "").trim(),
    rate: number(row[4]),
  })).filter((row) => row.name && row.rate > 0),
  (row) => row.name,
);

const shippingRows = rows(shopee.Sheets["Biaya Gratis Ongkir Xtra"]);
const preOrderOptions = shippingRows.slice(2, 4).map((row) => ({
  name: String(row[0] || "").trim(),
  rate: number(row[1]),
})).filter((row) => row.name);
const promoOptions = shippingRows.slice(6, 10).map((row) => ({
  name: String(row[0] || "").trim(),
  rate: number(row[1]),
})).filter((row) => row.name);
const freeShippingOptions = shippingRows.slice(13, 31).map((row) => ({
  name: String(row[1] || "").trim(),
  rate: number(row[2]),
  cap: String(row[1] || "").startsWith("Ukuran Khusus") ? 60000 : 40000,
})).filter((row) => row.name && row.rate > 0);

const tiktok = readWorkbook("Ongkir Tiktok Terbaru per 1 Mei 2026.xlsx");
const masterRows = rows(tiktok.Sheets["Master Ongkir"]);
const tiktokRates = masterRows.slice(1).map((row) => ({
  shippingType: String(row[0] || "").trim(),
  origin: String(row[1] || "").trim(),
  destination: String(row[2] || "").trim(),
  rates: [number(row[3]), number(row[4]), number(row[5]), number(row[6]), number(row[7]), number(row[8])],
})).filter((row) => row.shippingType && row.origin && row.destination && row.rates.some(Boolean));

const zones = Array.from(new Set(tiktokRates.flatMap((row) => [row.origin, row.destination]))).sort();
const shippingTypes = Array.from(new Set(tiktokRates.map((row) => row.shippingType))).sort();

const output = `export type ShopeeAdminCategory = {
  group: string;
  name: string;
  detail: string;
  rate: number;
};

export type FeeOption = {
  name: string;
  rate: number;
};

export type FreeShippingOption = FeeOption & {
  cap: number;
};

export type TiktokRate = {
  shippingType: string;
  origin: string;
  destination: string;
  rates: [number, number, number, number, number, number];
};

export const shopeeAdminCategories = ${JSON.stringify(adminCategories, null, 2)} satisfies ShopeeAdminCategory[];

export const shopeePreOrderOptions = ${JSON.stringify(preOrderOptions, null, 2)} satisfies FeeOption[];

export const shopeePromoOptions = ${JSON.stringify(promoOptions, null, 2)} satisfies FeeOption[];

export const shopeeFreeShippingOptions = ${JSON.stringify(freeShippingOptions, null, 2)} satisfies FreeShippingOption[];

export const tiktokZones = ${JSON.stringify(zones, null, 2)} satisfies string[];

export const tiktokShippingTypes = ${JSON.stringify(shippingTypes, null, 2)} satisfies string[];

export const tiktokRates = ${JSON.stringify(tiktokRates, null, 2)} satisfies TiktokRate[];
`;

fs.mkdirSync(path.join(root, "src", "data"), { recursive: true });
fs.writeFileSync(path.join(root, "src", "data", "workbookData.ts"), output);
console.log(`Extracted ${adminCategories.length} Shopee categories, ${tiktokRates.length} TikTok rates.`);
