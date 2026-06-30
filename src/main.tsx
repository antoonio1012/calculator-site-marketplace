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
  ppnRate: 0,
  ppnBasis: "finalPrice",
  useHemat: false,
  useInsurance: false,
  targetMargin: 20,
  competitorPrice: 0,
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
    affiliateRate: 10,
    adminCategory: "Pakaian Pria Lainnya",
    freeShipping: "Ukuran Biasa - A",
    promo: "Promo Xtra+",
    preOrder: "Tidak Ikut",
    ppnRate: 0,
    ppnBasis: "finalPrice",
    useHemat: false,
    useInsurance: false,
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
  const [input, setInput] = React.useState<ShopeeInput>(defaultShopee);
  const result = calculateShopee(input);

  function patch(key: keyof ShopeeInput, value: string | number | boolean) {
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
          <Field label="HPP / modal (Rp)">
            <NumberInput value={input.cost} onChange={(value) => patch("cost", value)} />
          </Field>
          <Field label="Target harga jual (Rp)">
            <NumberInput value={input.targetPrice} onChange={(value) => patch("targetPrice", value)} />
          </Field>
          <Field label="Diskon penjual (Rp)">
            <NumberInput value={input.sellerDiscount} onChange={(value) => patch("sellerDiscount", value)} />
          </Field>
          <Field label="Komisi Affiliate (%)">
            <NumberInput value={input.affiliateRate} step={0.1} onChange={(value) => patch("affiliateRate", value)} />
          </Field>
          <Field label="Kategori admin">
            <select value={input.adminCategory} onChange={(event) => patch("adminCategory", event.target.value)}>
              {shopeeAdminCategories.map((item) => (
                <option value={item.name} key={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
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
          <Field label="Pajak PPN">
            <select value={input.ppnRate} onChange={(event) => patch("ppnRate", toNumber(event.target.value))}>
              <option value={0}>Tidak Ada PPN (0%)</option>
              <option value={0.11}>PPN 11%</option>
              <option value={0.12}>PPN 12%</option>
            </select>
          </Field>
          {input.ppnRate > 0 && (
            <Field label="Basis Perhitungan PPN">
              <select value={input.ppnBasis} onChange={(event) => patch("ppnBasis", event.target.value)}>
                <option value="finalPrice">Harga Final (Dibayar Customer)</option>
                <option value="sellerReceives">Dana Diterima (Setelah Potong Fee)</option>
              </select>
            </Field>
          )}
          <Field label="Program Hemat Biaya Kirim">
            <select value={input.useHemat ? "yes" : "no"} onChange={(event) => patch("useHemat", event.target.value === "yes")}>
              <option value="no">Tidak Ikut</option>
              <option value="yes">Ikut (Rp350 / pesanan)</option>
            </select>
          </Field>
          <Field label="Asuransi Pengiriman">
            <select value={input.useInsurance ? "yes" : "no"} onChange={(event) => patch("useInsurance", event.target.value === "yes")}>
              <option value="no">Tidak Ada / Pembeli</option>
              <option value="yes">Ditanggung Penjual (0.5% dari harga final)</option>
            </select>
          </Field>
          <Field label="Target Margin (%)">
            <NumberInput value={input.targetMargin ?? 20} step={1} onChange={(value) => patch("targetMargin", value)} />
          </Field>
          <Field label="Harga Jual Kompetitor (Rp - Opsional)">
            <NumberInput value={input.competitorPrice ?? 0} step={1000} onChange={(value) => patch("competitorPrice", value)} />
          </Field>
        </div>
        <p className="source">Shopee fee logic dari workbook terbaru per 2026.</p>
      </section>
      <ShopeeResults result={result} input={input} />
    </div>
  );
}

function ShopeeResults({ result, input }: { result: ReturnType<typeof calculateShopee>; input: ShopeeInput }) {
  const recResult = calculateShopee({ ...input, targetPrice: result.recommendedPrice }, true);
  
  const competitorPrice = input.competitorPrice;
  let compResult = null;
  if (competitorPrice && competitorPrice > 0) {
    compResult = calculateShopee({ ...input, targetPrice: competitorPrice }, true);
  }

  return (
    <section className="panel results">
      <div className="section-title">
        <BarChart3 size={18} />
        <h2>Hasil Analisis & Perhitungan</h2>
      </div>

      <div className="metrics-summary" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div className="main-metric" style={{ background: 'linear-gradient(135deg, #1d6f52 0%, #114c37 100%)', color: 'white', padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '110px', boxShadow: '0 4px 15px rgba(29, 111, 82, 0.2)' }}>
          <span style={{ fontSize: '13px', opacity: 0.85 }}>Dana Diterima Bersih (Net)</span>
          <strong style={{ fontSize: '24px', fontWeight: '700', marginTop: '6px' }}>{rupiah.format(result.sellerReceivesAfterTaxAndAffiliate)}</strong>
          <span style={{ fontSize: '11px', opacity: 0.75, marginTop: '4px' }}>Sudah dikurangi PPh, PPN & Affiliate</span>
        </div>
        <div className="main-metric" style={{ background: result.profit >= 0 ? 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' : 'linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)', color: result.profit >= 0 ? '#1b5e20' : '#b71c1c', padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '110px' }}>
          <span style={{ fontSize: '13px', opacity: 0.85 }}>Profit Bersih (Margin)</span>
          <strong style={{ fontSize: '24px', fontWeight: '700', marginTop: '6px' }}>
            {rupiah.format(result.profit)} ({formatPercent(result.margin)})
          </strong>
          <span style={{ fontSize: '11px', opacity: 0.75, marginTop: '4px' }}>Target Margin: {input.targetMargin}%</span>
        </div>
      </div>

      <div className="metrics" style={{ marginBottom: '16px' }}>
        <Metric label="Harga Final Customer" value={rupiah.format(result.finalPrice)} />
        <Metric label="Rekomendasi Harga Jual" value={rupiah.format(result.recommendedPrice)} />
      </div>

      <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#16201b' }}>Rincian Biaya & Potongan</h3>
      <table style={{ fontSize: '13px', width: '100%' }}>
        <tbody>
          <tr>
            <td>Harga Final Produk (Dibayar Customer)</td>
            <td>-</td>
            <td style={{ textAlign: 'right', fontWeight: '600' }}>{rupiah.format(result.finalPrice)}</td>
          </tr>
          <tr>
            <td>Biaya Admin Kategori</td>
            <td>{formatPercent(result.adminRate)}</td>
            <td style={{ textAlign: 'right', color: '#b71c1c' }}>-{rupiah.format(result.adminFee)}</td>
          </tr>
          <tr>
            <td>Gratis Ongkir Xtra</td>
            <td>{formatPercent(result.freeShippingRate)}</td>
            <td style={{ textAlign: 'right', color: '#b71c1c' }}>-{rupiah.format(result.freeShippingFee)}</td>
          </tr>
          <tr>
            <td>Promo Xtra</td>
            <td>{formatPercent(result.promoRate)}</td>
            <td style={{ textAlign: 'right', color: '#b71c1c' }}>-{rupiah.format(result.promoFee)}</td>
          </tr>
          <tr>
            <td>Biaya Proses Pesanan</td>
            <td>Fix</td>
            <td style={{ textAlign: 'right', color: '#b71c1c' }}>-{rupiah.format(result.processingFee)}</td>
          </tr>
          <tr>
            <td>Pre-order</td>
            <td>{formatPercent(result.preOrderRate)}</td>
            <td style={{ textAlign: 'right', color: '#b71c1c' }}>-{rupiah.format(result.preOrderFee)}</td>
          </tr>
          {input.useHemat && (
            <tr>
              <td>Program Hemat Biaya Kirim</td>
              <td>Fix</td>
              <td style={{ textAlign: 'right', color: '#b71c1c' }}>-{rupiah.format(result.hematFee)}</td>
            </tr>
          )}
          {input.useInsurance && (
            <tr>
              <td>Asuransi Pengiriman</td>
              <td>0.50%</td>
              <td style={{ textAlign: 'right', color: '#b71c1c' }}>-{rupiah.format(result.insuranceFee)}</td>
            </tr>
          )}
          <tr style={{ fontWeight: '600', borderTop: '2px solid #e0e6de', borderBottom: '2px solid #e0e6de' }}>
            <td>Dana Diterima Toko (Marketplace)</td>
            <td>-</td>
            <td style={{ textAlign: 'right' }}>{rupiah.format(result.sellerReceives)}</td>
          </tr>
          <tr>
            <td>Komisi Affiliate</td>
            <td>{input.affiliateRate}%</td>
            <td style={{ textAlign: 'right', color: '#b71c1c' }}>-{rupiah.format(result.affiliateFee)}</td>
          </tr>
          <tr>
            <td>Pajak PPh (Star Seller)</td>
            <td>0.50%</td>
            <td style={{ textAlign: 'right', color: '#b71c1c' }}>-{rupiah.format(result.tax)}</td>
          </tr>
          {result.ppnFee > 0 && (
            <tr>
              <td>Pajak PPN ({input.ppnRate * 100}%) <span style={{ fontSize: '10px', color: '#68746e' }}>({input.ppnBasis === "finalPrice" ? "dari Harga Final" : "dari Dana Diterima"})</span></td>
              <td>{input.ppnRate * 100}%</td>
              <td style={{ textAlign: 'right', color: '#b71c1c' }}>-{rupiah.format(result.ppnFee)}</td>
            </tr>
          )}
          <tr style={{ fontWeight: '700', background: '#f5f7f4', borderTop: '2px solid #1d6f52', borderBottom: '2px solid #1d6f52' }}>
            <td>Dana Diterima Bersih (Net)</td>
            <td>-</td>
            <td style={{ textAlign: 'right', color: '#16704e' }}>{rupiah.format(result.sellerReceivesAfterTaxAndAffiliate)}</td>
          </tr>
          <tr>
            <td>HPP / Modal</td>
            <td>-</td>
            <td style={{ textAlign: 'right', color: '#68746e' }}>-{rupiah.format(input.cost)}</td>
          </tr>
          <tr style={{ fontWeight: '700', fontSize: '14px', borderTop: '1px solid #e0e6de' }}>
            <td>Profit Bersih Akhir</td>
            <td>-</td>
            <td style={{ textAlign: 'right', color: result.profit >= 0 ? '#16704e' : '#bf3d3d' }}>
              {rupiah.format(result.profit)}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="explanation-card" style={{ marginTop: '16px', padding: '12px', border: '1px dashed #1d6f52', borderRadius: '8px', background: '#f0f7f4', fontSize: '12px', color: '#27523f', lineHeight: '1.4' }}>
        <h4 style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: '700', color: '#114c37' }}>
          💡 Apa beda Target Harga vs Rekomendasi Harga?
        </h4>
        <p style={{ marginBottom: '6px' }}>
          <strong>Target Harga ({rupiah.format(result.finalPrice)})</strong> adalah harga yang Anda coba tebak. Dengan harga ini, profit bersih nyata yang Anda peroleh adalah <strong>{rupiah.format(result.profit)}</strong> (Margin <strong>{formatPercent(result.margin)}</strong>).
        </p>
        <p>
          <strong>Rekomendasi Harga ({rupiah.format(result.recommendedPrice)})</strong> adalah harga jual yang disarankan secara otomatis. Jika Anda menjual di harga ini, Anda akan menerima dana bersih yang setara dengan target keuntungan awal Anda (HPP + margin target {input.targetMargin}%), yaitu menghasilkan dana bersih <strong>{rupiah.format(recResult.sellerReceivesAfterTaxAndAffiliate)}</strong> dan profit bersih <strong>{rupiah.format(recResult.profit)}</strong> (Margin <strong>{formatPercent(recResult.margin)}</strong>).
        </p>
      </div>

      {compResult && competitorPrice !== undefined && (
        <div className="competitor-card" style={{ marginTop: '12px', padding: '12px', border: '1px solid #cbd4ca', borderRadius: '8px', background: '#fafbfc', fontSize: '12px', color: '#333', lineHeight: '1.4' }}>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: '700', color: '#2a3a2a' }}>
            ⚔️ Perbandingan dengan Kompetitor ({rupiah.format(competitorPrice)})
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
            <div style={{ background: '#f5f7f8', padding: '8px', borderRadius: '6px' }}>
              <span style={{ color: '#666', display: 'block', fontSize: '11px' }}>Dana Bersih Kompetitor</span>
              <strong style={{ fontSize: '13px' }}>{rupiah.format(compResult.sellerReceivesAfterTaxAndAffiliate)}</strong>
            </div>
            <div style={{ background: compResult.profit >= 0 ? '#e8f5e9' : '#ffebee', padding: '8px', borderRadius: '6px' }}>
              <span style={{ color: '#666', display: 'block', fontSize: '11px' }}>Profit Kompetitor (Margin)</span>
              <strong style={{ fontSize: '13px', color: compResult.profit >= 0 ? '#2e7d32' : '#c62828' }}>
                {rupiah.format(compResult.profit)} ({formatPercent(compResult.margin)})
              </strong>
            </div>
          </div>
          <p style={{ marginTop: '8px', color: '#555', fontSize: '11.5px' }}>
            {result.finalPrice < competitorPrice ? (
              <span>Harga Anda <strong>lebih murah {rupiah.format(competitorPrice - result.finalPrice)}</strong> dibanding kompetitor. Anda masih bisa menaikkan harga untuk menyamai kompetitor dan meningkatkan margin.</span>
            ) : result.finalPrice > competitorPrice ? (
              <span>Harga Anda <strong>lebih mahal {rupiah.format(result.finalPrice - competitorPrice)}</strong> dibanding kompetitor. Margin kompetitor adalah {formatPercent(compResult.margin)}.</span>
            ) : (
              <span>Harga Anda <strong>sama dengan harga kompetitor</strong>.</span>
            )}
          </p>
        </div>
      )}
    </section>
  );
}

function ShopeeBatch() {
  const [globalPpnRate, setGlobalPpnRate] = React.useState(0);
  const [globalPpnBasis, setGlobalPpnBasis] = React.useState<"finalPrice" | "sellerReceives">("finalPrice");
  const [globalUseHemat, setGlobalUseHemat] = React.useState(false);
  const [globalUseInsurance, setGlobalUseInsurance] = React.useState(false);

  const [rows, setRows] = React.useState(defaultRows);

  const calculated = rows.map((row) => ({
    row,
    result: calculateShopee({
      ...row,
      ppnRate: globalPpnRate,
      ppnBasis: globalPpnBasis,
      useHemat: globalUseHemat,
      useInsurance: globalUseInsurance,
      targetPrice: row.cost + row.desiredProfit,
    }),
  }));

  const totals = calculated.reduce(
    (sum, item) => ({
      finalPrice: sum.finalPrice + item.result.finalPrice,
      fees: sum.fees + item.result.totalFees + item.result.affiliateFee + item.result.tax + item.result.ppnFee,
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

      <div className="global-controls" style={{ background: '#f5f7f4', border: '1px solid #dce2d8', borderRadius: '8px', padding: '12px', marginBottom: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#4e5a54' }}>Global PPN</label>
          <select value={globalPpnRate} onChange={(event) => setGlobalPpnRate(toNumber(event.target.value))}>
            <option value={0}>Tidak Ada PPN (0%)</option>
            <option value={0.11}>PPN 11%</option>
            <option value={0.12}>PPN 12%</option>
          </select>
        </div>
        {globalPpnRate > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#4e5a54' }}>Basis Perhitungan PPN</label>
            <select value={globalPpnBasis} onChange={(event) => setGlobalPpnBasis(event.target.value as "finalPrice" | "sellerReceives")}>
              <option value="finalPrice">Harga Final (Customer)</option>
              <option value="sellerReceives">Dana Diterima (Setelah Fee)</option>
            </select>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#4e5a54' }}>Program Hemat Biaya Kirim</label>
          <select value={globalUseHemat ? "yes" : "no"} onChange={(event) => setGlobalUseHemat(event.target.value === "yes")}>
            <option value="no">Tidak Ikut</option>
            <option value="yes">Ikut (Rp350 / pesanan)</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '12px', fontWeight: '600', color: '#4e5a54' }}>Asuransi Pengiriman</label>
          <select value={globalUseInsurance ? "yes" : "no"} onChange={(event) => setGlobalUseInsurance(event.target.value === "yes")}>
            <option value="no">Tidak Ada / Pembeli</option>
            <option value="yes">Ditanggung Penjual (0.5%)</option>
          </select>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Produk</th><th>HPP</th><th>Untung Bersih</th><th>Diskon</th><th>Affiliate (%)</th><th>Kategori</th><th>Ongkir</th><th>Promo</th><th>Diterima Net</th><th>Profit Net</th><th>Rekomendasi</th><th></th>
            </tr>
          </thead>
          <tbody>
            {calculated.map(({ row, result }) => (
              <tr key={row.id}>
                <td><input value={row.name} onChange={(event) => update(row.id, { name: event.target.value })} /></td>
                <td><input type="number" value={row.cost} onChange={(event) => update(row.id, { cost: toNumber(event.target.value) })} /></td>
                <td><input type="number" value={row.desiredProfit} onChange={(event) => update(row.id, { desiredProfit: toNumber(event.target.value) })} /></td>
                <td><input type="number" value={row.sellerDiscount} onChange={(event) => update(row.id, { sellerDiscount: toNumber(event.target.value) })} /></td>
                <td><input type="number" step="0.1" value={row.affiliateRate} onChange={(event) => update(row.id, { affiliateRate: toNumber(event.target.value) })} /></td>
                <td>
                  <select value={row.adminCategory} onChange={(event) => update(row.id, { adminCategory: event.target.value })} style={{ minWidth: '180px' }}>
                    {shopeeAdminCategories.map((item) => <option key={item.name}>{item.name}</option>)}
                  </select>
                </td>
                <td><select value={row.freeShipping} onChange={(event) => update(row.id, { freeShipping: event.target.value })}>{shopeeFreeShippingOptions.map((item) => <option key={item.name}>{item.name}</option>)}</select></td>
                <td><select value={row.promo} onChange={(event) => update(row.id, { promo: event.target.value })}>{shopeePromoOptions.map((item) => <option key={item.name}>{item.name}</option>)}</select></td>
                <td>{rupiah.format(result.sellerReceivesAfterTaxAndAffiliate)}</td>
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
        <Metric label="Total Potongan (Fee & Pajak)" value={rupiah.format(totals.fees)} />
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
