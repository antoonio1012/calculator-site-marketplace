import { describe, expect, it } from "vitest";
import { calculateShopee } from "./shopee";
import {
  estimateTiktokShipping,
  getWeightBucketIndex,
  mapProvinceToZone,
  mapShippingType,
  calculateTiktok,
} from "./tiktok";

describe("Shopee calculator", () => {
  it("matches the single calculator workbook sample", () => {
    const result = calculateShopee({
      cost: 66000,
      targetPrice: 125000,
      sellerDiscount: 0,
      adminCategory: "Alat & Aksesoris Musik",
      freeShipping: "Ukuran Biasa - E",
      promo: "Setelah 11 Sept",
      preOrder: "Tidak Ikut",
      affiliateRate: 0,
      ppnRate: 0,
      ppnBasis: "finalPrice",
      useHemat: false,
      useInsurance: false,
    });

    expect(result.totalFees).toBe(26250);
    expect(result.sellerReceives).toBe(98750);
    // profit is sellerReceives - HPP - affiliateFee - tax = 98750 - 66000 - 0 - 493.75 = 32256.25
    expect(result.profit).toBe(32256.25);
    // recommendedPrice is now solved exactly to yield 125000 net receives:
    // 126243.75 / 0.796 ≈ 158597.675879
    expect(result.recommendedPrice).toBeCloseTo(158597.68, 1);
  });

  it("matches the dashboard row sample", () => {
    const result = calculateShopee({
      cost: 100000,
      targetPrice: 125000,
      sellerDiscount: 0,
      adminCategory: "Pakaian Pria Lainnya",
      freeShipping: "Ukuran Biasa - A",
      promo: "Promo Xtra+",
      preOrder: "Tidak Ikut",
      affiliateRate: 10, // 10% instead of 0.1 decimal
      ppnRate: 0,
      ppnBasis: "finalPrice",
      useHemat: false,
      useInsurance: false,
    });

    expect(result.finalPrice).toBe(125000);
    expect(result.totalFees).toBe(20937.5);
    expect(result.sellerReceives).toBe(104062.5);
    expect(result.affiliateFee).toBe(12500);
    // tax is 104062.5 * 0.005 = 520.3125
    // profit is sellerReceives - HPP - affiliateFee - tax = 104062.5 - 100000 - 12500 - 520.3125 = -8957.8125
    expect(result.profit).toBe(-8957.8125);
    // recommendedPrice solved exactly to yield 125000 net receives:
    // target net receives = 100000 + 25000 = 125000.
    // admin: 9%, shipping: 1% (cap 40000), promo: 6.5% (cap 80000), processing: 1250, affiliate: 10%, tax: 0.5% of receives.
    // Let's expect the solver's exact output.
    expect(result.recommendedPrice).toBeCloseTo(170995.21, 1);
  });
});

describe("TikTok calculator", () => {
  it("looks up workbook rates", () => {
    expect(estimateTiktokShipping("Jawa", "DKI Jakarta", "Standard", 1)).toBe(690);
  });

  it("uses the expected weight buckets", () => {
    expect(getWeightBucketIndex(1)).toBe(0);
    expect(getWeightBucketIndex(1.01)).toBe(1);
    expect(getWeightBucketIndex(2)).toBe(1);
    expect(getWeightBucketIndex(5)).toBe(4);
    expect(getWeightBucketIndex(5.01)).toBe(5);
  });

  it("maps shipping type text", () => {
    expect(mapShippingType("Same Day 8 Jam")).toBe("Instant & Same Day");
    expect(mapShippingType("J&T Cargo")).toBe("Cargo");
    expect(mapShippingType("Ekonomi")).toBe("Economy");
    expect(mapShippingType("SiCepat Standard")).toBe("Standard");
  });

  it("maps province text to TikTok zones", () => {
    expect(mapProvinceToZone("DKI Jakarta")).toBe("DKI Jakarta");
    expect(mapProvinceToZone("Jawa Barat")).toBe("Jawa");
    expect(mapProvinceToZone("Papua Barat")).toBe("Papua & Maluku");
    expect(mapProvinceToZone("Unknown Province")).toBe("Cek Manual");
  });

  it("calculates platform fees and recommended price", () => {
    const result = calculateTiktok({
      cost: 66000,
      targetPrice: 125000,
      sellerDiscount: 0,
      adminRate: 0.0825,
      bebasOngkirRate: 0.04,
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
      targetMargin: 20
    });

    expect(result.finalPrice).toBe(125000);
    expect(result.adminFee).toBe(10312.5);
    expect(result.bebasOngkirFee).toBe(5000);
    expect(result.handlingFee).toBe(1250);
    expect(result.totalFees).toBe(16562.5);
    expect(result.sellerReceives).toBe(108437.5);
    expect(result.sellerReceivesAfterTaxAndAffiliate).toBeCloseTo(107895.31, 1);
    expect(result.profit).toBeCloseTo(41895.31, 1);
  });
});
