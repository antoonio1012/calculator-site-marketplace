import { tiktokRates } from "../data/workbookData";

export type TiktokOrder = {
  orderId: string;
  deliveryOption: string;
  province: string;
  weight: number;
  gmv: number;
};

export type TiktokCalculatedOrder = TiktokOrder & {
  shippingType: string;
  destinationZone: string;
  shippingFee: number;
  needsManualCheck: boolean;
};

export function getWeightBucketIndex(weight: number) {
  if (weight <= 1) return 0;
  if (weight <= 2) return 1;
  if (weight <= 3) return 2;
  if (weight <= 4) return 3;
  if (weight <= 5) return 4;
  return 5;
}

export function getWeightBucketLabel(weight: number) {
  return ["0-1 kg", "1.01-2 kg", "2.01-3 kg", "3.01-4 kg", "4.01-5 kg", ">5 kg"][getWeightBucketIndex(weight)];
}

export function mapShippingType(text: string) {
  const value = text.toLowerCase();
  if (/instan|instant|same day|same-day|8 jam/.test(value)) return "Instant & Same Day";
  if (/kargo|cargo/.test(value)) return "Cargo";
  if (/ekonomi|economy/.test(value)) return "Economy";
  if (/standar|standard|anteraja|sicepat/.test(value)) return "Standard";
  return "Standard";
}

export function mapProvinceToZone(text: string) {
  const value = text.toLowerCase();
  if (/jakarta|雅加达/.test(value)) return "DKI Jakarta";
  if (/bali/.test(value)) return "Bali";
  if (/nusa tenggara|west nusa tenggara|ntb|east nusa tenggara|ntt/.test(value)) return "Nusa Tenggara";
  if (/sumatera|sumatra|aceh|riau|jambi|lampung|bangka|bengkulu/.test(value)) return "Sumatra";
  if (/sulawesi|gorontalo/.test(value)) return "Sulawesi";
  if (/kalimantan/.test(value)) return "Kalimantan";
  if (/maluku|papua/.test(value)) return "Papua & Maluku";
  if (/jawa|yogya|yogyakarta|jogja|jateng|jatim|jabar|中爪哇|java|banten|banten province/.test(value)) return "Jawa";
  return "Cek Manual";
}

export function estimateTiktokShipping(origin: string, destination: string, shippingType: string, weight: number) {
  const match = tiktokRates.find(
    (row) => row.origin === origin && row.destination === destination && row.shippingType === shippingType,
  );
  return match?.rates[getWeightBucketIndex(weight)] ?? 0;
}

export function calculateTiktokOrders(origin: string, orders: TiktokOrder[]) {
  return orders.map((order): TiktokCalculatedOrder => {
    const shippingType = mapShippingType(order.deliveryOption);
    const destinationZone = mapProvinceToZone(order.province);
    const shippingFee =
      destinationZone === "Cek Manual" ? 0 : estimateTiktokShipping(origin, destinationZone, shippingType, order.weight);
    return {
      ...order,
      shippingType,
      destinationZone,
      shippingFee,
      needsManualCheck: destinationZone === "Cek Manual" || shippingFee === 0,
    };
  });
}

export function summarizeTiktokOrders(rows: TiktokCalculatedOrder[]) {
  const gmv = rows.reduce((sum, row) => sum + row.gmv, 0);
  const shipping = rows.reduce((sum, row) => sum + row.shippingFee, 0);
  return {
    gmv,
    shipping,
    percentage: gmv > 0 ? shipping / gmv : 0,
    manualCheckCount: rows.filter((row) => row.needsManualCheck).length,
  };
}

export function groupTiktokRows(rows: TiktokCalculatedOrder[], key: "destinationZone" | "shippingType") {
  const groups = new Map<string, { label: string; count: number; gmv: number; shipping: number }>();
  for (const row of rows) {
    const label = row[key];
    const group = groups.get(label) ?? { label, count: 0, gmv: 0, shipping: 0 };
    group.count += 1;
    group.gmv += row.gmv;
    group.shipping += row.shippingFee;
    groups.set(label, group);
  }
  return Array.from(groups.values()).sort((a, b) => b.shipping - a.shipping);
}

// TikTok Shop Admin & Marketplace Calculator
export type TiktokInput = {
  cost: number;
  targetPrice: number;
  sellerDiscount: number;
  adminRate: number; // e.g. 0.0825
  bebasOngkirRate: number; // e.g. 0.04
  handlingFee: number; // e.g. 1250
  preOrderRate: number; // e.g. 0.03
  affiliateRate: number; // percentage (e.g. 2 for 2%)
  ppnRate: number; // e.g. 0.11
  ppnBasis: "finalPrice" | "sellerReceives";
  useInsurance: boolean;
  insuranceRate: number; // 0.005
  // Shipping cost options
  chargeShippingToSeller: boolean;
  origin: string;
  destination: string;
  shippingType: string;
  weight: number;
  competitorPrice?: number;
  targetMargin?: number;
};

export type TiktokCalculationResult = {
  finalPrice: number;
  adminFee: number;
  bebasOngkirFee: number;
  handlingFee: number;
  preOrderFee: number;
  affiliateFee: number;
  insuranceFee: number;
  shippingFee: number;
  totalFees: number;
  sellerReceives: number;
  ppnFee: number;
  tax: number; // PPh
  sellerReceivesAfterTaxAndAffiliate: number;
  profit: number;
  margin: number;
  recommendedPrice: number;
};

export const tiktokAdminCategories = [
  { name: "Kategori Grup A (10.0%)", rate: 0.10 },
  { name: "Kategori Grup B (9.5%)", rate: 0.095 },
  { name: "Kategori Grup C (9.0%)", rate: 0.09 },
  { name: "Kategori Grup D (8.25%)", rate: 0.0825 },
  { name: "Kategori Grup E (7.5%)", rate: 0.075 },
  { name: "Kategori Grup F (6.5%)", rate: 0.065 },
  { name: "Kategori Grup G (5.5%)", rate: 0.055 },
  { name: "Kategori Grup H (4.25%)", rate: 0.0425 },
  { name: "Kategori Grup I (3.25%)", rate: 0.0325 },
  { name: "Kategori Grup J (2.5%)", rate: 0.025 },
  { name: "Kategori Grup K (1.0%)", rate: 0.010 }
];

export const tiktokBebasOngkirOptions = [
  { name: "Tidak Ikut (0%)", rate: 0.0 },
  { name: "Bebas Ongkir Reguler (4.0%)", rate: 0.04 },
  { name: "Bebas Ongkir Xtra (6.0%)", rate: 0.06 }
];

export const defaultTiktokInput: TiktokInput = {
  cost: 66000,
  targetPrice: 125000,
  sellerDiscount: 0,
  adminRate: 0.0825, // Grup D default
  bebasOngkirRate: 0.04, // 4% default
  handlingFee: 1250,
  preOrderRate: 0,
  affiliateRate: 0,
  ppnRate: 0,
  ppnBasis: "finalPrice",
  useInsurance: false,
  insuranceRate: 0.005,
  chargeShippingToSeller: false,
  origin: "Jawa",
  destination: "DKI Jakarta",
  shippingType: "Standard",
  weight: 1,
  targetMargin: 20,
  competitorPrice: 0
};

export function calculateTiktok(input: TiktokInput, isSolving = false): TiktokCalculationResult {
  const finalPrice = Math.max(0, input.targetPrice - input.sellerDiscount);
  const adminFee = finalPrice * input.adminRate;
  const bebasOngkirFee = finalPrice * input.bebasOngkirRate;
  const handlingFee = input.handlingFee;
  const preOrderFee = finalPrice * input.preOrderRate;
  const affiliateFee = finalPrice * (input.affiliateRate / 100);
  const insuranceFee = input.useInsurance ? finalPrice * input.insuranceRate : 0;
  
  const shippingFee = input.chargeShippingToSeller
    ? estimateTiktokShipping(input.origin, input.destination, input.shippingType, input.weight)
    : 0;

  const totalFees = adminFee + bebasOngkirFee + handlingFee + preOrderFee + insuranceFee + shippingFee;
  const sellerReceives = Math.max(0, finalPrice - totalFees);

  let ppnFee = 0;
  if (input.ppnRate > 0) {
    ppnFee = input.ppnBasis === "finalPrice" ? finalPrice * input.ppnRate : sellerReceives * input.ppnRate;
  }

  // PPh is 0.5% of sellerReceives
  const tax = sellerReceives * 0.005;

  const sellerReceivesAfterTaxAndAffiliate = Math.max(0, sellerReceives - affiliateFee - tax - ppnFee);
  const profit = sellerReceivesAfterTaxAndAffiliate - input.cost;
  const margin = finalPrice > 0 ? profit / finalPrice : 0;

  // Bisection solver for recommendedPrice
  let recommendedPrice = 0;
  if (!isSolving) {
    const targetMargin = (input.targetMargin ?? 20) / 100;
    let low = input.cost;
    let high = input.cost * 10;
    if (high < 100000) high = 1000000;
    
    for (let i = 0; i < 50; i++) {
      const mid = (low + high) / 2;
      const testInput = { ...input, targetPrice: mid };
      const testRes = calculateTiktok(testInput, true);
      if (testRes.profit / testRes.finalPrice < targetMargin) {
        low = mid;
      } else {
        high = mid;
      }
    }
    recommendedPrice = Math.round((low + high) / 2);
  }

  return {
    finalPrice,
    adminFee,
    bebasOngkirFee,
    handlingFee,
    preOrderFee,
    affiliateFee,
    insuranceFee,
    shippingFee,
    totalFees,
    sellerReceives,
    ppnFee,
    tax,
    sellerReceivesAfterTaxAndAffiliate,
    profit,
    margin,
    recommendedPrice
  };
}
