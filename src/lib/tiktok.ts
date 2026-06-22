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
