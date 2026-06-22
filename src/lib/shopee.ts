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

export function calculateShopee(input: ShopeeInput) {
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
  const totalFees = adminFee + freeShippingFee + promoFee + processingFee + preOrderFee;
  const feeRate = finalPrice > 0 ? totalFees / finalPrice : 0;
  const sellerReceives = finalPrice - totalFees;
  const affiliateFee = finalPrice * input.affiliateRate;
  const sellerReceivesAfterAffiliate = sellerReceives - affiliateFee;
  const tax = sellerReceives * 0.005;
  const profit = sellerReceives - input.cost - affiliateFee;
  const margin = sellerReceivesAfterAffiliate > 0 ? profit / sellerReceivesAfterAffiliate : 0;
  const recommendedPrice = finalPrice + finalPrice * feeRate + affiliateFee + tax;

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
    totalFees,
    feeRate,
    sellerReceives,
    affiliateFee,
    sellerReceivesAfterAffiliate,
    tax,
    profit,
    margin,
    recommendedPrice,
  };
}
