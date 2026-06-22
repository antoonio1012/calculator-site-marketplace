import React from "react";
import ReactDOM from "react-dom/client";
import { BarChart3, Calculator, FileSpreadsheet, Plus, Trash2, Upload } from "lucide-react";
import * as XLSX from "xlsx";
import "./styles.css";
import {
  shopeeAdminCategories,
  shopeeFreeShippingOptions,
  shopeePreOrderOptions,
  shopeePromoOptions,
  tiktokShippingTypes,
  tiktokZones,
} from "./data/workbookData";
import { formatPercent, rupiah, toNumber } from "./lib/format";
import { calculateShopee, type ShopeeInput } from "./lib/shopee";
import {
  calculateTiktokOrders,
  estimateTiktokShipping,
  getWeightBucketLabel,
  groupTiktokRows,
  mapProvinceToZone,
  mapShippingType,
  summarizeTiktokOrders,
  type TiktokOrder,
} from "./lib/tiktok";

type Mode = "shopee" | "tiktok";
type ShopeeTab = "single" | "batch";
type TiktokTab = "single" | "bulk";

const defaultShopee: ShopeeInput = {
  cost: 66000,
  targetPrice: 125000,
  sellerDiscount: 0,
  adminCategory: "Alat & Aksesoris Musik",
  freeShipping: "Ukuran Biasa - E",
  promo: "Setelah 11 Sept",
  preOrder: "Tidak Ikut",
  affiliateRate: 0,
};

type ShopeeRow = ShopeeInput & { id: number; name: string; desiredProfit: number };

const defaultRows: ShopeeRow[] = [
  {
    id: 1,
    name: "Design Sablon A",
    cost: 100000,
    desiredProfit: 25000,
    targetPrice: 125000,
    sellerDiscount: 0,
    affiliateRate: 0.1,
    adminCategory: "Pakaian Pria Lainnya",
    freeShipping: "Ukuran Biasa - A",
    promo: "Promo Xtra+",
    preOrder: "Tidak Ikut",
  },
];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function NumberInput({
  value,
  onChange,
  step = 1000,
}: {
  value: number;
  onChange: (value: number) => void;
  step?: number;
}) {
  return <input type="number" value={value} step={step} onChange={(event) => onChange(toNumber(event.target.value))} />;
}

function SearchSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <>
      <input list={`${placeholder ?? "list"}-options`} value={value} onChange={(event) => onChange(event.target.value)} />
      <datalist id={`${placeholder ?? "list"}-options`}>
        {options.map((option) => (
          <option value={option} key={option} />
        ))}
      </datalist>
    </>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: "good" | "bad" }) {
  return (
    <div className={`metric ${tone ?? ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ShopeeSingle() {
  const [input, setInput] = React.useState(defaultShopee);
  const result = calculateShopee(input);

  function patch(key: keyof ShopeeInput, value: string | number) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="workspace two-col">
      <section className="panel">
        <div className="section-title">
          <Calculator size={18} />
          <h2>Shopee Single Calculator</h2>
        </div>
        <div className="form-grid">
          <Field label="HPP / modal">
            <NumberInput value={input.cost} onChange={(value) => patch("cost", value)} />
          </Field>
          <Field label="Target harga jual">
            <NumberInput value={input.targetPrice} onChange={(value) => patch("targetPrice", value)} />
          </Field>
          <Field label="Diskon penjual">
            <NumberInput value={input.sellerDiscount} onChange={(value) => patch("sellerDiscount", value)} />
          </Field>
          <Field label="Affiliate %">
            <NumberInput value={input.affiliateRate} step={0.01} onChange={(value) => patch("affiliateRate", value)} />
          </Field>
          <Field label="Kategori admin">
            <SearchSelect
              value={input.adminCategory}
              onChange={(value) => patch("adminCategory", value)}
              options={shopeeAdminCategories.map((item) => item.name)}
              placeholder="admin"
            />
          </Field>
          <Field label="Gratis Ongkir Xtra">
            <select value={input.freeShipping} onChange={(event) => patch("freeShipping", event.target.value)}>
              {shopeeFreeShippingOptions.map((item) => (
                <option value={item.name} key={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Promo Xtra">
            <select value={input.promo} onChange={(event) => patch("promo", event.target.value)}>
              {shopeePromoOptions.map((item) => (
                <option value={item.name} key={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Pre-order">
            <select value={input.preOrder} onChange={(event) => patch("preOrder", event.target.value)}>
              {shopeePreOrderOptions.map((item) => (
                <option value={item.name} key={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <p className="source">Shopee fee logic from uploaded calculator workbook.</p>
      </section>
      <ShopeeResults result={result} />
    </div>
  );
}

function ShopeeResults({ result }: { result: ReturnType<typeof calculateShopee> }) {
  return (
    <section className="panel results">
      <div className="section-title">
        <BarChart3 size={18} />
        <h2>Hasil Perhitungan</h2>
      </div>
      <div className="metrics">
        <Metric label="Harga final" value={rupiah.format(result.finalPrice)} />
        <Metric label="Total fee" value={rupiah.format(result.totalFees)} />
        <Metric label="Dana diterima" value={rupiah.format(result.sellerReceives)} />
        <Metric label="Profit" value={rupiah.format(result.profit)} tone={result.profit >= 0 ? "good" : "bad"} />
        <Metric label="Margin" value={formatPercent(result.margin)} />
        <Metric label="Rekomendasi harga" value={rupiah.format(result.recommendedPrice)} />
      </div>
      <table>
        <tbody>
          <tr><td>Admin</td><td>{formatPercent(result.adminRate)}</td><td>{rupiah.format(result.adminFee)}</td></tr>
          <tr><td>Gratis Ongkir Xtra</td><td>{formatPercent(result.freeShippingRate)}</td><td>{rupiah.format(result.freeShippingFee)}</td></tr>
          <tr><td>Promo Xtra</td><td>{formatPercent(result.promoRate)}</td><td>{rupiah.format(result.promoFee)}</td></tr>
          <tr><td>Proses pesanan</td><td>Fix</td><td>{rupiah.format(result.processingFee)}</td></tr>
          <tr><td>Pre-order</td><td>{formatPercent(result.preOrderRate)}</td><td>{rupiah.format(result.preOrderFee)}</td></tr>
          <tr><td>Affiliate</td><td></td><td>{rupiah.format(result.affiliateFee)}</td></tr>
          <tr><td>Pajak PPh</td><td>0,50%</td><td>{rupiah.format(result.tax)}</td></tr>
        </tbody>
      </table>
    </section>
  );
}

function ShopeeBatch() {
  const [rows, setRows] = React.useState(defaultRows);
  const calculated = rows.map((row) => ({ row, result: calculateShopee({ ...row, targetPrice: row.cost + row.desiredProfit }) }));
  const totals = calculated.reduce(
    (sum, item) => ({
      finalPrice: sum.finalPrice + item.result.finalPrice,
      fees: sum.fees + item.result.totalFees,
      profit: sum.profit + item.result.profit,
      recommended: sum.recommended + item.result.recommendedPrice,
    }),
    { finalPrice: 0, fees: 0, profit: 0, recommended: 0 },
  );

  function update(id: number, patch: Partial<ShopeeRow>) {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, ...patch, targetPrice: (patch.cost ?? row.cost) + (patch.desiredProfit ?? row.desiredProfit) } : row)),
    );
  }

  return (
    <section className="panel wide">
      <div className="toolbar">
        <div className="section-title">
          <FileSpreadsheet size={18} />
          <h2>Dashboard Harga Shopee</h2>
        </div>
        <button onClick={() => setRows((current) => [...current, { ...defaultRows[0], id: Date.now(), name: "Produk Baru" }])}>
          <Plus size={16} /> Baris
        </button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Produk</th><th>HPP</th><th>Untung</th><th>Diskon</th><th>Affiliate</th><th>Kategori</th><th>Ongkir</th><th>Promo</th><th>Total Fee</th><th>Diterima</th><th>Profit</th><th>Rekomendasi</th><th></th>
            </tr>
          </thead>
          <tbody>
            {calculated.map(({ row, result }) => (
              <tr key={row.id}>
                <td><input value={row.name} onChange={(event) => update(row.id, { name: event.target.value })} /></td>
                <td><input type="number" value={row.cost} onChange={(event) => update(row.id, { cost: toNumber(event.target.value) })} /></td>
                <td><input type="number" value={row.desiredProfit} onChange={(event) => update(row.id, { desiredProfit: toNumber(event.target.value) })} /></td>
                <td><input type="number" value={row.sellerDiscount} onChange={(event) => update(row.id, { sellerDiscount: toNumber(event.target.value) })} /></td>
                <td><input type="number" step="0.01" value={row.affiliateRate} onChange={(event) => update(row.id, { affiliateRate: toNumber(event.target.value) })} /></td>
                <td><SearchSelect value={row.adminCategory} onChange={(value) => update(row.id, { adminCategory: value })} options={shopeeAdminCategories.map((item) => item.name)} placeholder={`admin-${row.id}`} /></td>
                <td><select value={row.freeShipping} onChange={(event) => update(row.id, { freeShipping: event.target.value })}>{shopeeFreeShippingOptions.map((item) => <option key={item.name}>{item.name}</option>)}</select></td>
                <td><select value={row.promo} onChange={(event) => update(row.id, { promo: event.target.value })}>{shopeePromoOptions.map((item) => <option key={item.name}>{item.name}</option>)}</select></td>
                <td>{rupiah.format(result.totalFees)}</td>
                <td>{rupiah.format(result.sellerReceives)}</td>
                <td className={result.profit >= 0 ? "positive" : "negative"}>{rupiah.format(result.profit)}</td>
                <td>{rupiah.format(result.recommendedPrice)}</td>
                <td><button className="icon" onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}><Trash2 size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="summary-strip">
        <Metric label="GMV final" value={rupiah.format(totals.finalPrice)} />
        <Metric label="Total fee" value={rupiah.format(totals.fees)} />
        <Metric label="Total profit" value={rupiah.format(totals.profit)} tone={totals.profit >= 0 ? "good" : "bad"} />
        <Metric label="Rekomendasi total" value={rupiah.format(totals.recommended)} />
      </div>
    </section>
  );
}

function ShopeeMode() {
  const [tab, setTab] = React.useState<ShopeeTab>("single");
  return (
    <>
      <div className="tabs">
        <button className={tab === "single" ? "active" : ""} onClick={() => setTab("single")}>Single</button>
        <button className={tab === "batch" ? "active" : ""} onClick={() => setTab("batch")}>Batch</button>
      </div>
      {tab === "single" ? <ShopeeSingle /> : <ShopeeBatch />}
    </>
  );
}

function TiktokSingle() {
  const [origin, setOrigin] = React.useState("Jawa");
  const [destination, setDestination] = React.useState("DKI Jakarta");
  const [shippingType, setShippingType] = React.useState("Standard");
  const [weight, setWeight] = React.useState(1);
  const fee = estimateTiktokShipping(origin, destination, shippingType, weight);

  return (
    <div className="workspace two-col">
      <section className="panel">
        <div className="section-title">
          <Calculator size={18} />
          <h2>TikTok Ongkir Single</h2>
        </div>
        <div className="form-grid">
          <Field label="Asal pengiriman"><select value={origin} onChange={(event) => setOrigin(event.target.value)}>{tiktokZones.map((zone) => <option key={zone}>{zone}</option>)}</select></Field>
          <Field label="Tujuan"><select value={destination} onChange={(event) => setDestination(event.target.value)}>{tiktokZones.map((zone) => <option key={zone}>{zone}</option>)}</select></Field>
          <Field label="Tipe pengiriman"><select value={shippingType} onChange={(event) => setShippingType(event.target.value)}>{tiktokShippingTypes.map((type) => <option key={type}>{type}</option>)}</select></Field>
          <Field label="Berat kg"><NumberInput value={weight} step={0.01} onChange={setWeight} /></Field>
        </div>
        <p className="source">TikTok ongkir per 1 Mei 2026.</p>
      </section>
      <section className="panel results">
        <div className="metrics">
          <Metric label="Estimasi ongkir" value={rupiah.format(fee)} />
          <Metric label="Bucket berat" value={getWeightBucketLabel(weight)} />
        </div>
      </section>
    </div>
  );
}

function pick(row: Record<string, unknown>, names: string[]) {
  const key = Object.keys(row).find((item) => names.includes(item.trim().toLowerCase()));
  return key ? row[key] : "";
}

function TiktokBulk() {
  const [origin, setOrigin] = React.useState("Jawa");
  const [orders, setOrders] = React.useState<TiktokOrder[]>([]);
  const calculated = calculateTiktokOrders(origin, orders);
  const summary = summarizeTiktokOrders(calculated);
  const byZone = groupTiktokRows(calculated, "destinationZone");
  const byType = groupTiktokRows(calculated, "shippingType");

  async function importFile(file: File) {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const parsed = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });
    setOrders(parsed.map((row, index) => ({
      orderId: String(pick(row, ["order id", "platform unique order id."]) || index + 1),
      deliveryOption: String(pick(row, ["delivery option", "the order's delivery option."])),
      province: String(pick(row, ["province"])),
      weight: toNumber(pick(row, ["weight(kg)"])),
      gmv: toNumber(pick(row, ["sku subtotal after discount", "it equals sku subtotal before discount - sku platform discount - sku seller discount."])),
    })).filter((row) => row.gmv || row.weight || row.province));
  }

  return (
    <section className="panel wide">
      <div className="toolbar">
        <div className="section-title">
          <Upload size={18} />
          <h2>Import Pesanan TikTok</h2>
        </div>
        <Field label="Asal">
          <select value={origin} onChange={(event) => setOrigin(event.target.value)}>
            {tiktokZones.map((zone) => <option key={zone}>{zone}</option>)}
          </select>
        </Field>
        <label className="upload">
          <Upload size={16} /> CSV/XLSX
          <input type="file" accept=".csv,.xlsx,.xls" onChange={(event) => event.target.files?.[0] && importFile(event.target.files[0])} />
        </label>
      </div>
      <div className="summary-strip">
        <Metric label="GMV after discount" value={rupiah.format(summary.gmv)} />
        <Metric label="Ongkir seller" value={rupiah.format(summary.shipping)} />
        <Metric label="% ongkir" value={formatPercent(summary.percentage)} />
        <Metric label="Cek manual" value={`${summary.manualCheckCount} baris`} tone={summary.manualCheckCount ? "bad" : "good"} />
      </div>
      <div className="grid-2">
        <GroupTable title="Per zona tujuan" rows={byZone} total={summary.shipping} />
        <GroupTable title="Per tipe pengiriman" rows={byType} total={summary.shipping} />
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Order</th><th>Delivery</th><th>Provinsi</th><th>Zona</th><th>Tipe</th><th>Berat</th><th>GMV</th><th>Ongkir</th></tr></thead>
          <tbody>
            {calculated.slice(0, 200).map((row) => (
              <tr key={row.orderId}>
                <td>{row.orderId}</td><td>{row.deliveryOption}</td><td>{row.province}</td><td>{row.destinationZone}</td><td>{row.shippingType}</td><td>{row.weight}</td><td>{rupiah.format(row.gmv)}</td><td>{rupiah.format(row.shippingFee)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!orders.length && <p className="empty">Upload export pesanan TikTok untuk melihat ringkasan ongkir. Mapping mengikuti workbook: delivery option, province, weight, dan SKU subtotal after discount.</p>}
    </section>
  );
}

function GroupTable({ title, rows, total }: { title: string; rows: ReturnType<typeof groupTiktokRows>; total: number }) {
  return (
    <div className="subpanel">
      <h3>{title}</h3>
      <table>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}><td>{row.label}</td><td>{row.count}</td><td>{rupiah.format(row.shipping)}</td><td>{formatPercent(total ? row.shipping / total : 0)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TiktokMode() {
  const [tab, setTab] = React.useState<TiktokTab>("single");
  return (
    <>
      <div className="tabs">
        <button className={tab === "single" ? "active" : ""} onClick={() => setTab("single")}>Single</button>
        <button className={tab === "bulk" ? "active" : ""} onClick={() => setTab("bulk")}>Import</button>
      </div>
      {tab === "single" ? <TiktokSingle /> : <TiktokBulk />}
    </>
  );
}

function App() {
  const [mode, setMode] = React.useState<Mode>("shopee");
  return (
    <main>
      <header>
        <div>
          <h1>Marketplace Calculator</h1>
          <p>Kalkulator fee Shopee dan estimasi ongkir TikTok Shop dari workbook lokal.</p>
        </div>
        <div className="mode-switch">
          <button className={mode === "shopee" ? "active" : ""} onClick={() => setMode("shopee")}>Shopee</button>
          <button className={mode === "tiktok" ? "active" : ""} onClick={() => setMode("tiktok")}>TikTok Shop</button>
        </div>
      </header>
      {mode === "shopee" ? <ShopeeMode /> : <TiktokMode />}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
