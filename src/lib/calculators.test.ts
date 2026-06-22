import { describe, expect, it } from "vitest";
import { calculateShopee } from "./shopee";
import {
  estimateTiktokShipping,
  getWeightBucketIndex,
  mapProvinceToZone,
  mapShippingType,
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
    });

    expect(result.totalFees).toBe(26250);
    expect(result.sellerReceives).toBe(98750);
    expect(result.profit).toBe(32750);
    expect(result.recommendedPrice).toBe(151743.75);
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
      affiliateRate: 0.1,
    });

    expect(result.finalPrice).toBe(125000);
    expect(result.totalFees).toBe(20937.5);
    expect(result.sellerReceives).toBe(104062.5);
    expect(result.affiliateFee).toBe(12500);
    expect(result.recommendedPrice).toBe(158957.8125);
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
});
