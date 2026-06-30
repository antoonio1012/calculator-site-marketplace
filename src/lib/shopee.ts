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
  freeShipping: string;
  promo: string;
  preOrder: string;
  affiliateRate: number;
  ppnRate: number;
  ppnBasis: "finalPrice" | "sellerReceives";
  useHemat: boolean;
  useInsurance: boolean;
  desiredProfit?: number;
  targetMargin?: number;
  competitorPrice?: number;
};

export type ShopeeResult = ReturnType<typeof calculateShopee>;

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

export function calculateShopee(input: ShopeeInput, skipRecommend = false) {
  const finalPrice = Math.max(0, input.targetPrice - input.sellerDiscount);
  const adminRate = getAdminRate(input.adminCategory);
  const freeShippingOption = getFreeShippingOption(input.freeShipping);
  const promoRate = getPromoRate(input.promo);
  const preOrderRate = getPreOrderRate(input.preOrder);
  
  const adminFee = finalPrice * adminRate;
  const freeShippingFee = Math.min(finalPrice * freeShippingOption.rate, freeShippingOption.cap);
  const promoCap = input.promo === "Promo Xtra+" ? 80000 : 60000;
  const promoFee = Math.min(finalPrice * promoRate, promoCap);
  const processingFee = finalPrice > 0 ? 1250 : 0;
  const preOrderFee = finalPrice * preOrderRate;
  
  const hematFee = input.useHemat && finalPrice > 0 ? 350 : 0;
  const insuranceFee = input.useInsurance ? finalPrice * 0.005 : 0;

  const totalFees = adminFee + freeShippingFee + promoFee + processingFee + preOrderFee + hematFee + insuranceFee;
  const feeRate = finalPrice > 0 ? totalFees / finalPrice : 0;
  const sellerReceives = finalPrice - totalFees;
  const affiliateFee = finalPrice * (input.affiliateRate / 100);
  const tax = sellerReceives * 0.005;

  let ppnFee = 0;
  if (input.ppnRate > 0) {
    if (input.ppnBasis === "finalPrice") {
      ppnFee = finalPrice * input.ppnRate;
    } else {
      ppnFee = sellerReceives * input.ppnRate;
    }
  }

  const sellerReceivesAfterTax = sellerReceives - tax;
  const sellerReceivesAfterTaxAndAffiliate = sellerReceives - tax - affiliateFee - ppnFee;
  const profit = sellerReceivesAfterTaxAndAffiliate - input.cost;
  const margin = sellerReceivesAfterTaxAndAffiliate > 0 ? profit / sellerReceivesAfterTaxAndAffiliate : 0;

  let recommendedPrice = 0;
  if (!skipRecommend) {
    if (input.desiredProfit !== undefined) {
      recommendedPrice = solvePriceForNetReceives(input.cost + input.desiredProfit, input);
    } else if (input.targetMargin !== undefined) {
      recommendedPrice = solvePriceForNetReceives(input.cost / (1 - input.targetMargin / 100), input);
    } else {
      const fallbackProfit = Math.max(0, input.targetPrice - input.cost);
      recommendedPrice = solvePriceForNetReceives(input.cost + fallbackProfit, input);
    }
  }

  return {
    finalPrice,
    adminRate,
    adminFee,
    freeShippingRate: freeShippingOption.rate,
    freeShippingFee,
    promoRate,
    promoFee,
    processingFee,
    preOrderRate,
    preOrderFee,
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
    recommendedPrice,
  };
}

