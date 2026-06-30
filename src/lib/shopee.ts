import {
  shopeeAdminCategories,
  shopeeFreeShippingOptions,
  shopeePreOrderOptions,
  shopeePromoOptions,
} from "../data/workbookData";

export type ShopeeInput = {
  cost: number;
  targetPrice: number;
  sellerDiscount: number;
  adminCategory: string;
  
  // Dimensions & Weight for Free Shipping
  packageWeight: number; // in kg
  packageLength: number; // in cm
  packageWidth: number; // in cm
  packageHeight: number; // in cm
  freeShippingGroup: string; // "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "manual"
  
  freeShipping: string; // fallback manual option
  promo: string;
  preOrder: string;
  
  // Level Toko & Payment Fee
  sellerLevel: "star" | "nonstar_new" | "mall";
  paymentRate: number; // e.g. 2.0%
  
  // Affiliate & Platform Voucher
  affiliateRate: number;
  platformDiscount: number; // Voucher Shopee
  
  // PPh & PPN
  ppnRate: number;
  ppnBasis: "finalPrice" | "sellerReceives" | "platformFees";
  useHemat: boolean;
  useInsurance: boolean;
  usePph: boolean; // PPh 0.5% toggle
  
  // Ads
  adCost: number; // Rp
  
  desiredProfit?: number;
  targetMargin?: number;
  competitorPrice?: number;
};

export type ShopeeResult = ReturnType<typeof calculateShopee>;

export const shopeeFreeShippingGroups = [
  { name: "Grup A (Fesyen & Aksesoris tertentu)", code: "A", biasa: 0.01, khusus: 0.025 },
  { name: "Grup B (Elektronik & Skincare tertentu)", code: "B", biasa: 0.02, khusus: 0.035 },
  { name: "Grup C (Home Living & Sembako tertentu)", code: "C", biasa: 0.035, khusus: 0.05 },
  { name: "Grup D (Lainnya - 5.5% / 7.0%)", code: "D", biasa: 0.055, khusus: 0.07 },
  { name: "Grup E (Umum/Makanan - 6.0% / 7.5%)", code: "E", biasa: 0.06, khusus: 0.075 },
  { name: "Grup F (Lainnya - 6.5% / 8.0%)", code: "F", biasa: 0.065, khusus: 0.08 },
  { name: "Grup G (Lainnya - 7.5% / 9.0%)", code: "G", biasa: 0.075, khusus: 0.09 },
  { name: "Grup H (Lainnya - 8.0% / 9.5%)", code: "H", biasa: 0.08, khusus: 0.095 }
];

export function getAdminRate(categoryName: string) {
  return shopeeAdminCategories.find((item) => item.name === categoryName)?.rate ?? 0;
}

export function getFreeShippingOption(name: string) {
  return shopeeFreeShippingOptions.find((item) => item.name === name) ?? shopeeFreeShippingOptions[0];
}

export function getPromoRate(name: string) {
  return shopeePromoOptions.find((item) => item.name === name)?.rate ?? 0;
}

export function getPreOrderRate(name: string) {
  return shopeePreOrderOptions.find((item) => item.name === name)?.rate ?? 0;
}

export function solvePriceForNetReceives(targetNetReceives: number, input: ShopeeInput): number {
  let low = targetNetReceives;
  let high = targetNetReceives * 3 + 100000;
  let fp = (low + high) / 2;
  for (let i = 0; i < 40; i++) {
    const res = calculateShopee({ ...input, targetPrice: fp }, true);
    const val = res.sellerReceivesAfterTaxAndAffiliate;
    if (val < targetNetReceives) {
      low = fp;
    } else {
      high = fp;
    }
    fp = (low + high) / 2;
    if (Math.abs(val - targetNetReceives) < 0.01) break;
  }
  return fp;
}

export function calculateShopee(input: Partial<ShopeeInput> & { cost: number; targetPrice: number; sellerDiscount: number; adminCategory: string }, skipRecommend = false) {
  const {
    cost,
    targetPrice,
    sellerDiscount,
    adminCategory,
    packageWeight = 0,
    packageLength = 0,
    packageWidth = 0,
    packageHeight = 0,
    freeShippingGroup = "manual",
    freeShipping = "Tidak Ikut",
    promo = "Tidak Ikut",
    preOrder = "Tidak Ikut",
    sellerLevel = "star",
    paymentRate = 0,
    affiliateRate = 0,
    platformDiscount = 0,
    ppnRate = 0,
    ppnBasis = "finalPrice",
    useHemat = false,
    useInsurance = false,
    usePph = true,
    adCost = 0,
    targetMargin = 20,
  } = input;

  const finalPrice = Math.max(0, targetPrice - sellerDiscount);
  
  // 1. Admin Rate based on Seller Level
  let adminRate = getAdminRate(adminCategory);
  if (sellerLevel === "nonstar_new") {
    adminRate = 0; // 0% admin fee for new non-star
  } else if (sellerLevel === "mall") {
    adminRate = adminRate + 0.02; // Mall surcharge of +2%
  }
  const adminFee = finalPrice * adminRate;

  // 2. Free Shipping Rate based on Dimensions & Weight OR Manual Dropdown
  let freeShippingRate = 0;
  let freeShippingCap = 0;
  let isSpecialSize = false;
  let usedAutoShipping = false;

  const hasDimensions = packageLength > 0 || packageWidth > 0 || packageHeight > 0;
  const hasWeight = packageWeight > 0;

  if ((hasDimensions || hasWeight) && freeShippingGroup !== "manual") {
    const volume = packageLength * packageWidth * packageHeight;
    isSpecialSize = 
      packageWeight >= 5 || 
      packageLength >= 60 || 
      packageWidth >= 60 || 
      packageHeight >= 60 || 
      volume >= 20000;

    const matchedGroup = shopeeFreeShippingGroups.find((g) => g.code === freeShippingGroup) || shopeeFreeShippingGroups[4]; // Default Group E
    freeShippingRate = isSpecialSize ? matchedGroup.khusus : matchedGroup.biasa;
    freeShippingCap = isSpecialSize ? 60000 : 40000;
    usedAutoShipping = true;
  } else {
    // Fallback to manual selection
    const freeShippingOption = getFreeShippingOption(freeShipping);
    freeShippingRate = freeShippingOption.rate;
    freeShippingCap = freeShippingOption.cap;
    isSpecialSize = freeShippingOption.name.includes("Khusus");
  }
  const freeShippingFee = Math.min(finalPrice * freeShippingRate, freeShippingCap);

  // 3. Promo Xtra
  const promoRate = getPromoRate(promo);
  const promoCap = promo === "Promo Xtra+" ? 80000 : 60000;
  const promoFee = Math.min(finalPrice * promoRate, promoCap);

  // 4. Pre-Order & Processing Fees
  const preOrderRate = getPreOrderRate(preOrder);
  const preOrderFee = finalPrice * preOrderRate;
  const processingFee = finalPrice > 0 ? 1250 : 0;

  // 5. Payment Transaction Fee
  const paymentFee = finalPrice * (paymentRate / 100);

  // 6. Optional program fees
  const hematFee = useHemat && finalPrice > 0 ? 350 : 0;
  const insuranceFee = useInsurance ? finalPrice * 0.005 : 0;

  // 7. Summarize total fees before tax
  const totalFees = adminFee + freeShippingFee + promoFee + processingFee + preOrderFee + paymentFee + hematFee + insuranceFee;
  const feeRate = finalPrice > 0 ? totalFees / finalPrice : 0;
  const sellerReceives = finalPrice - totalFees;

  // 8. Affiliate Fee calculated based on Buyer Payment Value (net of platform discount voucher)
  const buyerPayment = Math.max(0, finalPrice - platformDiscount);
  const affiliateFee = buyerPayment * (affiliateRate / 100);

  // 9. Taxes
  const tax = usePph ? sellerReceives * 0.005 : 0; // PPh 0.5%

  let ppnFee = 0;
  if (ppnRate > 0) {
    if (ppnBasis === "finalPrice") {
      ppnFee = finalPrice * ppnRate;
    } else if (ppnBasis === "sellerReceives") {
      ppnFee = sellerReceives * ppnRate;
    } else {
      ppnFee = totalFees * ppnRate; // PPN 11%/12% of total platform fees
    }
  }

  const sellerReceivesAfterTax = sellerReceives - tax;
  const sellerReceivesAfterTaxAndAffiliate = sellerReceives - tax - affiliateFee - ppnFee;
  
  // 10. Ads cost and metrics
  const profit = sellerReceivesAfterTaxAndAffiliate - cost - adCost;
  const margin = sellerReceivesAfterTaxAndAffiliate > 0 ? profit / sellerReceivesAfterTaxAndAffiliate : 0;
  
  const acos = finalPrice > 0 ? (adCost / finalPrice) * 100 : 0;
  const roas = adCost > 0 ? finalPrice / adCost : 0;

  let recommendedPrice = 0;
  if (!skipRecommend) {
    if (input.desiredProfit !== undefined) {
      recommendedPrice = solvePriceForNetReceives(cost + adCost + input.desiredProfit, input as ShopeeInput);
    } else if (input.targetMargin !== undefined) {
      // Numerical bisection search for exact target margin
      const targetMarginVal = targetMargin / 100;
      let low = cost;
      let high = cost * 10 + 100000;
      for (let i = 0; i < 40; i++) {
        const fp = (low + high) / 2;
        const testRes = calculateShopee({ ...input, targetPrice: fp }, true);
        const testMargin = testRes.profit / testRes.sellerReceivesAfterTaxAndAffiliate;
        if (testMargin < targetMarginVal) {
          low = fp;
        } else {
          high = fp;
        }
      }
      recommendedPrice = (low + high) / 2;
    } else {
      const fallbackProfit = Math.max(0, targetPrice - cost);
      recommendedPrice = solvePriceForNetReceives(cost + adCost + fallbackProfit, input as ShopeeInput);
    }
  }

  return {
    finalPrice,
    adminRate,
    adminFee,
    freeShippingRate,
    freeShippingFee,
    promoRate,
    promoFee,
    processingFee,
    preOrderRate,
    preOrderFee,
    paymentFee,
    hematFee,
    insuranceFee,
    totalFees,
    feeRate,
    sellerReceives,
    affiliateFee,
    sellerReceivesAfterTax,
    sellerReceivesAfterTaxAndAffiliate,
    tax,
    ppnFee,
    profit,
    margin,
    acos,
    roas,
    recommendedPrice,
    isSpecialSize,
    usedAutoShipping,
    buyerPayment
  };
}
