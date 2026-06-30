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
  calculateTiktok,
  defaultTiktokInput,
  tiktokAdminCategories,
  tiktokBebasOngkirOptions,
  type TiktokInput,
  type TiktokCalculationResult,
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
  min,
}: {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
}) {
  const [localValue, setLocalValue] = React.useState<string>(String(value));

  React.useEffect(() => {
    const parsedLocal = toNumber(localValue);
    if (parsedLocal !== value) {
      setLocalValue(String(value));
    }
  }, [value]);

  return (
    <input
      type="number"
      value={localValue}
      step={step}
      min={min}
      onChange={(event) => {
        const val = event.target.value;
        setLocalValue(val);
        const parsed = toNumber(val);
        onChange(parsed);
      }}
      onBlur={() => {
        if (localValue === "") {
          setLocalValue("0");
          onChange(0);
        } else {
          setLocalValue(String(toNumber(localValue)));
        }
      }}
    />
  );
}

function SearchableSelect({
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={containerRef} className="searchable-select" style={{ position: "relative", width: "100%" }}>
      <div
        className="select-trigger"
        onClick={() => {
          setIsOpen(!isOpen);
          setSearch("");
        }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #cfd8d1",
          borderRadius: "7px",
          padding: "8px 10px",
          background: "white",
          cursor: "pointer",
          minHeight: "40px",
          fontSize: "14px",
          boxSizing: "border-box"
        }}
      >
        <span style={{ color: value ? "#15231c" : "#68746e", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
          {value || placeholder || "Pilih..."}
        </span>
        <span style={{ fontSize: "10px", color: "#68746e", marginLeft: "8px" }}>▼</span>
      </div>

      {isOpen && (
        <div
          className="select-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #cfd8d1",
            borderRadius: "7px",
            marginTop: "4px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 1000,
            maxHeight: "250px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <input
            type="text"
            placeholder="Cari kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            style={{
              border: "none",
              borderBottom: "1px solid #e2e7e0",
              borderRadius: "7px 7px 0 0",
              outline: "none",
              padding: "10px",
              minHeight: "36px",
              width: "100%",
              boxSizing: "border-box"
            }}
          />
          <div
            className="options-list"
            style={{
              overflowY: "auto",
              maxHeight: "200px"
            }}
          >
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <div
                  key={opt}
                  className="option-item"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    background: opt === value ? "#eef2ec" : "transparent",
                    color: "#15231c",
                    fontSize: "13px",
                    borderBottom: "1px solid #f0f3ef",
                    textAlign: "left"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f7f4")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = opt === value ? "#eef2ec" : "transparent")
                  }
                >
                  {opt}
                </div>
              ))
            ) : (
              <div style={{ padding: "10px", color: "#68746e", fontSize: "13px", textAlign: "left" }}>
                Tidak ditemukan
              </div>
            )}
          </div>
        </div>
      )}
    </div>
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
          {/* Section 1: Dasar Harga & Target */}
          <div className="form-section-title">📊 Informasi Produk & Target</div>
          <Field label="HPP / modal (Rp)">
            <NumberInput value={input.cost} min={0} onChange={(value) => patch("cost", value)} />
          </Field>
          <Field label="Target Margin (%)">
            <NumberInput value={input.targetMargin ?? 20} step={1} min={0} onChange={(value) => patch("targetMargin", value)} />
          </Field>
          <Field label="Target harga jual (Rp)">
            <NumberInput value={input.targetPrice} min={0} onChange={(value) => patch("targetPrice", value)} />
          </Field>
          <Field label="Diskon penjual (Rp)">
            <NumberInput value={input.sellerDiscount} min={0} onChange={(value) => patch("sellerDiscount", value)} />
          </Field>

          {/* Section 2: Layanan & Program Shopee */}
          <div className="form-section-title">🛍️ Layanan & Program Shopee</div>
          <Field label="Kategori admin">
            <SearchableSelect
              value={input.adminCategory}
              onChange={(value) => patch("adminCategory", value)}
              options={shopeeAdminCategories.map((item) => item.name)}
              placeholder="Cari kategori admin..."
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

          {/* Section 3: Komisi & Pajak */}
          <div className="form-section-title">💸 Komisi & Pajak Tambahan</div>
          <Field label="Komisi Affiliate (%)">
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', width: '100%', height: '40px' }}>
              <div style={{ flex: '1', minWidth: '50px' }}>
                <NumberInput value={input.affiliateRate} step={0.1} min={0} onChange={(value) => patch("affiliateRate", value)} />
              </div>
              <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                {[0, 2, 5, 10].map((pct) => (
                  <button
                    type="button"
                    key={pct}
                    onClick={() => patch("affiliateRate", pct)}
                    className={`quick-btn ${input.affiliateRate === pct ? 'active' : ''}`}
                    style={{
                      padding: '0 6px',
                      height: '34px',
                      lineHeight: '34px',
                      fontSize: '11px',
                      minWidth: '32px',
                      textAlign: 'center'
                    }}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          </Field>
          <Field label="Pajak PPN">
            <select value={input.ppnRate} onChange={(event) => patch("ppnRate", toNumber(event.target.value))}>
              <option value={0}>Tidak Ada PPN (0%)</option>
              <option value={0.11}>PPN 11%</option>
              <option value={0.12}>PPN 12%</option>
            </select>
          </Field>
          {input.ppnRate > 0 && (
            <div className="full-width">
              <Field label="Basis Perhitungan PPN">
                <select value={input.ppnBasis} onChange={(event) => patch("ppnBasis", event.target.value)}>
                  <option value="finalPrice">Harga Final (Dibayar Customer)</option>
                  <option value="sellerReceives">Dana Diterima (Setelah Potong Fee)</option>
                </select>
              </Field>
            </div>
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

          {/* Section 4: Analisis Pembanding */}
          <div className="form-section-title">⚔️ Analisis Pembanding</div>
          <div className="full-width">
            <Field label="Harga Jual Kompetitor (Rp - Opsional)">
              <NumberInput value={input.competitorPrice ?? 0} step={1000} min={0} onChange={(value) => patch("competitorPrice", value)} />
            </Field>
          </div>
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
      <table>
        <tbody>
          <tr>
            <td>Harga Final Produk (Dibayar Customer)</td>
            <td>-</td>
            <td>{rupiah.format(result.finalPrice)}</td>
          </tr>
          <tr className="deduction">
            <td>Biaya Admin Kategori</td>
            <td><span className="rate-badge">{formatPercent(result.adminRate)}</span></td>
            <td>-{rupiah.format(result.adminFee)}</td>
          </tr>
          <tr className="deduction">
            <td>Gratis Ongkir Xtra</td>
            <td><span className="rate-badge">{formatPercent(result.freeShippingRate)}</span></td>
            <td>-{rupiah.format(result.freeShippingFee)}</td>
          </tr>
          <tr className="deduction">
            <td>Promo Xtra</td>
            <td><span className="rate-badge">{formatPercent(result.promoRate)}</span></td>
            <td>-{rupiah.format(result.promoFee)}</td>
          </tr>
          <tr className="deduction">
            <td>Biaya Proses Pesanan</td>
            <td><span className="rate-badge">Fix</span></td>
            <td>-{rupiah.format(result.processingFee)}</td>
          </tr>
          <tr className="deduction">
            <td>Pre-order</td>
            <td><span className="rate-badge">{formatPercent(result.preOrderRate)}</span></td>
            <td>-{rupiah.format(result.preOrderFee)}</td>
          </tr>
          {input.useHemat && (
            <tr className="deduction">
              <td>Program Hemat Biaya Kirim</td>
              <td><span className="rate-badge">Fix</span></td>
              <td>-{rupiah.format(result.hematFee)}</td>
            </tr>
          )}
          {input.useInsurance && (
            <tr className="deduction">
              <td>Asuransi Pengiriman</td>
              <td><span className="rate-badge">0.50%</span></td>
              <td>-{rupiah.format(result.insuranceFee)}</td>
            </tr>
          )}
          <tr className="subtotal-row">
            <td>Dana Diterima Toko (Marketplace)</td>
            <td>-</td>
            <td>{rupiah.format(result.sellerReceives)}</td>
          </tr>
          <tr className="deduction">
            <td>Komisi Affiliate</td>
            <td><span className="rate-badge">{input.affiliateRate}%</span></td>
            <td>-{rupiah.format(result.affiliateFee)}</td>
          </tr>
          <tr className="deduction">
            <td>Pajak PPh (Star Seller)</td>
            <td><span className="rate-badge">0.50%</span></td>
            <td>-{rupiah.format(result.tax)}</td>
          </tr>
          {result.ppnFee > 0 && (
            <tr className="deduction">
              <td>
                Pajak PPN ({input.ppnRate * 100}%) 
                <div style={{ fontSize: '10px', color: '#68746e', marginTop: '2px' }}>
                  ({input.ppnBasis === "finalPrice" ? "dari Harga Final" : "dari Dana Diterima"})
                </div>
              </td>
              <td><span className="rate-badge">{input.ppnRate * 100}%</span></td>
              <td>-{rupiah.format(result.ppnFee)}</td>
            </tr>
          )}
          <tr className="net-row">
            <td>Dana Diterima Bersih (Net)</td>
            <td>-</td>
            <td>{rupiah.format(result.sellerReceivesAfterTaxAndAffiliate)}</td>
          </tr>
          <tr className="deduction">
            <td>HPP / Modal</td>
            <td>-</td>
            <td>-{rupiah.format(input.cost)}</td>
          </tr>
          <tr className={`profit-row ${result.profit >= 0 ? 'addition' : 'deduction'}`}>
            <td>Profit Bersih Akhir</td>
            <td>-</td>
            <td>{rupiah.format(result.profit)}</td>
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
  const [input, setInput] = React.useState<TiktokInput>(defaultTiktokInput);
  const result = calculateTiktok(input);

  function patch(key: keyof TiktokInput, value: string | number | boolean) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="workspace two-col">
      <section className="panel">
        <div className="section-title">
          <Calculator size={18} />
          <h2>TikTok Single Calculator</h2>
        </div>
        <div className="form-grid">
          {/* Section 1: Dasar Harga & Target */}
          <div className="form-section-title">📊 Informasi Produk & Target</div>
          <Field label="HPP / modal (Rp)">
            <NumberInput value={input.cost} min={0} onChange={(value) => patch("cost", value)} />
          </Field>
          <Field label="Target Margin (%)">
            <NumberInput value={input.targetMargin ?? 20} step={1} min={0} onChange={(value) => patch("targetMargin", value)} />
          </Field>
          <Field label="Target harga jual (Rp)">
            <NumberInput value={input.targetPrice} min={0} onChange={(value) => patch("targetPrice", value)} />
          </Field>
          <Field label="Diskon penjual (Rp)">
            <NumberInput value={input.sellerDiscount} min={0} onChange={(value) => patch("sellerDiscount", value)} />
          </Field>

          {/* Section 2: Layanan & Program TikTok */}
          <div className="form-section-title">🛍️ Layanan & Program TikTok</div>
          <Field label="Kategori Admin">
            <select
              value={input.adminRate}
              onChange={(event) => patch("adminRate", toNumber(event.target.value))}
            >
              {tiktokAdminCategories.map((item) => (
                <option value={item.rate} key={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Bebas Ongkir (Komisi Dinamis)">
            <select
              value={input.bebasOngkirRate}
              onChange={(event) => patch("bebasOngkirRate", toNumber(event.target.value))}
            >
              {tiktokBebasOngkirOptions.map((item) => (
                <option value={item.rate} key={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Pre-order (PO 3%)">
            <select
              value={input.preOrderRate === 0 ? "no" : "yes"}
              onChange={(event) => patch("preOrderRate", event.target.value === "yes" ? 0.03 : 0)}
            >
              <option value="no">Tidak Ada / Normal</option>
              <option value="yes">Pre-order (+3% Komisi)</option>
            </select>
          </Field>
          <Field label="Biaya Proses (Handling)">
            <NumberInput value={input.handlingFee} min={0} onChange={(value) => patch("handlingFee", value)} />
          </Field>

          {/* Section 3: Komisi & Pajak */}
          <div className="form-section-title">💸 Komisi & Pajak Tambahan</div>
          <Field label="Komisi Affiliate (%)">
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', width: '100%', height: '40px' }}>
              <div style={{ flex: '1', minWidth: '50px' }}>
                <NumberInput value={input.affiliateRate} step={0.1} min={0} onChange={(value) => patch("affiliateRate", value)} />
              </div>
              <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                {[0, 2, 5, 10].map((pct) => (
                  <button
                    type="button"
                    key={pct}
                    onClick={() => patch("affiliateRate", pct)}
                    className={`quick-btn ${input.affiliateRate === pct ? 'active' : ''}`}
                    style={{
                      padding: '0 6px',
                      height: '34px',
                      lineHeight: '34px',
                      fontSize: '11px',
                      minWidth: '32px',
                      textAlign: 'center'
                    }}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          </Field>
          <Field label="Pajak PPN">
            <select value={input.ppnRate} onChange={(event) => patch("ppnRate", toNumber(event.target.value))}>
              <option value={0}>Tidak Ada PPN (0%)</option>
              <option value={0.11}>PPN 11%</option>
              <option value={0.12}>PPN 12%</option>
            </select>
          </Field>
          {input.ppnRate > 0 && (
            <div className="full-width">
              <Field label="Basis Perhitungan PPN">
                <select value={input.ppnBasis} onChange={(event) => patch("ppnBasis", event.target.value)}>
                  <option value="finalPrice">Harga Final (Dibayar Customer)</option>
                  <option value="sellerReceives">Dana Diterima (Setelah Potong Fee)</option>
                </select>
              </Field>
            </div>
          )}
          <Field label="Asuransi Pengiriman">
            <select value={input.useInsurance ? "yes" : "no"} onChange={(event) => patch("useInsurance", event.target.value === "yes")}>
              <option value="no">Tidak Ada / Pembeli</option>
              <option value="yes">Ditanggung Penjual (0.5% dari harga final)</option>
            </select>
          </Field>

          {/* Section 4: Ongkir & Pengiriman */}
          <div className="form-section-title">🚚 Ongkir & Beban Pengiriman</div>
          <div className="full-width">
            <Field label="Bebankan Ongkos Kirim ke Penjual?">
              <select
                value={input.chargeShippingToSeller ? "yes" : "no"}
                onChange={(event) => patch("chargeShippingToSeller", event.target.value === "yes")}
              >
                <option value="no">Tidak (Ditanggung Pembeli/TikTok)</option>
                <option value="yes">Ya (Mengurangi Profit Bersih Anda)</option>
              </select>
            </Field>
          </div>
          {input.chargeShippingToSeller && (
            <>
              <Field label="Asal pengiriman">
                <select value={input.origin} onChange={(event) => patch("origin", event.target.value)}>
                  {tiktokZones.map((zone) => <option key={zone}>{zone}</option>)}
                </select>
              </Field>
              <Field label="Tujuan">
                <select value={input.destination} onChange={(event) => patch("destination", event.target.value)}>
                  {tiktokZones.map((zone) => <option key={zone}>{zone}</option>)}
                </select>
              </Field>
              <Field label="Tipe pengiriman">
                <select value={input.shippingType} onChange={(event) => patch("shippingType", event.target.value)}>
                  {tiktokShippingTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
              </Field>
              <Field label="Berat kg">
                <NumberInput value={input.weight} step={0.01} min={0} onChange={(value) => patch("weight", value)} />
              </Field>
            </>
          )}

          {/* Section 5: Analisis Pembanding */}
          <div className="form-section-title">⚔️ Analisis Pembanding</div>
          <div className="full-width">
            <Field label="Harga Jual Kompetitor (Rp - Opsional)">
              <NumberInput value={input.competitorPrice ?? 0} step={1000} min={0} onChange={(value) => patch("competitorPrice", value)} />
            </Field>
          </div>
        </div>
        <p className="source">TikTok Shop fee & ongkir per 2026.</p>
      </section>
      <TiktokResults result={result} input={input} />
    </div>
  );
}

function TiktokResults({ result, input }: { result: TiktokCalculationResult; input: TiktokInput }) {
  const recResult = calculateTiktok({ ...input, targetPrice: result.recommendedPrice }, true);
  
  const competitorPrice = input.competitorPrice;
  let compResult = null;
  if (competitorPrice && competitorPrice > 0) {
    compResult = calculateTiktok({ ...input, targetPrice: competitorPrice }, true);
  }

  return (
    <section className="panel results">
      <div className="section-title">
        <BarChart3 size={18} />
        <h2>Hasil Analisis & Perhitungan</h2>
      </div>

      <div className="metrics-summary" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div className="main-metric" style={{ background: 'linear-gradient(135deg, #1d6f52 0%, #114c37 100%)', color: 'white', padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '110px', boxShadow: '0 4px 15px rgba(29, 111, 82, 0.2)' }}>
          <span style={{ fontSize: '13px', opacity: 0.85 }}>Dana Diterima Net</span>
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
      <table>
        <tbody>
          <tr>
            <td>Harga Final Produk (Dibayar Customer)</td>
            <td>-</td>
            <td>{rupiah.format(result.finalPrice)}</td>
          </tr>
          <tr className="deduction">
            <td>Biaya Komisi Platform</td>
            <td><span className="rate-badge">{formatPercent(input.adminRate)}</span></td>
            <td>-{rupiah.format(result.adminFee)}</td>
          </tr>
          {result.bebasOngkirFee > 0 && (
            <tr className="deduction">
              <td>Biaya Bebas Ongkir (Komisi Dinamis)</td>
              <td><span className="rate-badge">{formatPercent(input.bebasOngkirRate)}</span></td>
              <td>-{rupiah.format(result.bebasOngkirFee)}</td>
            </tr>
          )}
          <tr className="deduction">
            <td>Biaya Pemrosesan (Handling Fee)</td>
            <td><span className="rate-badge">Fix</span></td>
            <td>-{rupiah.format(result.handlingFee)}</td>
          </tr>
          {result.preOrderFee > 0 && (
            <tr className="deduction">
              <td>Biaya Pre-order (PO)</td>
              <td><span className="rate-badge">3.00%</span></td>
              <td>-{rupiah.format(result.preOrderFee)}</td>
            </tr>
          )}
          {result.insuranceFee > 0 && (
            <tr className="deduction">
              <td>Asuransi Pengiriman</td>
              <td><span className="rate-badge">0.50%</span></td>
              <td>-{rupiah.format(result.insuranceFee)}</td>
            </tr>
          )}
          {input.chargeShippingToSeller && result.shippingFee > 0 && (
            <tr className="deduction">
              <td>
                Beban Ongkir Seller
                <div style={{ fontSize: '10px', color: '#68746e', marginTop: '2px' }}>
                  ({input.origin} ke {input.destination}, {input.shippingType}, {input.weight}kg)
                </div>
              </td>
              <td><span className="rate-badge">{getWeightBucketLabel(input.weight)}</span></td>
              <td>-{rupiah.format(result.shippingFee)}</td>
            </tr>
          )}
          <tr className="subtotal-row">
            <td>Dana Diterima Toko (Marketplace)</td>
            <td>-</td>
            <td>{rupiah.format(result.sellerReceives)}</td>
          </tr>
          <tr className="deduction">
            <td>Komisi Affiliate</td>
            <td><span className="rate-badge">{input.affiliateRate}%</span></td>
            <td>-{rupiah.format(result.affiliateFee)}</td>
          </tr>
          <tr className="deduction">
            <td>Pajak PPh (Star/Super Seller)</td>
            <td><span className="rate-badge">0.50%</span></td>
            <td>-{rupiah.format(result.tax)}</td>
          </tr>
          {result.ppnFee > 0 && (
            <tr className="deduction">
              <td>
                Pajak PPN ({input.ppnRate * 100}%) 
                <div style={{ fontSize: '10px', color: '#68746e', marginTop: '2px' }}>
                  ({input.ppnBasis === "finalPrice" ? "dari Harga Final" : "dari Dana Diterima"})
                </div>
              </td>
              <td><span className="rate-badge">{input.ppnRate * 100}%</span></td>
              <td>-{rupiah.format(result.ppnFee)}</td>
            </tr>
          )}
          <tr className="net-row">
            <td>Dana Diterima Bersih (Net)</td>
            <td>-</td>
            <td>{rupiah.format(result.sellerReceivesAfterTaxAndAffiliate)}</td>
          </tr>
          <tr className="deduction">
            <td>HPP / Modal</td>
            <td>-</td>
            <td>-{rupiah.format(input.cost)}</td>
          </tr>
          <tr className={`profit-row ${result.profit >= 0 ? 'addition' : 'deduction'}`}>
            <td>Profit Bersih Akhir</td>
            <td>-</td>
            <td>{rupiah.format(result.profit)}</td>
          </tr>
        </tbody>
      </table>

      <div className="explanation-card" style={{ marginTop: '16px', padding: '12px', border: '1px dashed #1d6f52', borderRadius: '8px', background: '#f0f7f4', fontSize: '12px', color: '#27523f', lineHeight: '1.4' }}>
        <h4 style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: '700', color: '#114c37' }}>
          💡 Penjelasan Perhitungan TikTok Shop
        </h4>
        <p style={{ marginBottom: '6px' }}>
          <strong>Harga Jual ({rupiah.format(result.finalPrice)})</strong> menghasilkan profit bersih nyata sebesar <strong>{rupiah.format(result.profit)}</strong> (Margin <strong>{formatPercent(result.margin)}</strong>).
        </p>
        <p>
          <strong>Rekomendasi Harga ({rupiah.format(result.recommendedPrice)})</strong> disarankan agar Anda memperoleh profit bersih yang sesuai dengan target margin awal Anda ({input.targetMargin}%), yaitu menghasilkan dana bersih <strong>{rupiah.format(recResult.sellerReceivesAfterTaxAndAffiliate)}</strong> dan profit bersih <strong>{rupiah.format(recResult.profit)}</strong> (Margin <strong>{formatPercent(recResult.margin)}</strong>).
        </p>
      </div>

      {compResult && competitorPrice !== undefined && (
        <div className="competitor-card" style={{ marginTop: '12px', padding: '12px', border: '1px solid #cbd4ca', borderRadius: '8px', background: '#fafbfc', fontSize: '12px', color: '#333', lineHeight: '1.4' }}>
          <h4 style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: '700', color: '#2a3a2a' }}>
            ⚔️ Analisis Kompetitor ({rupiah.format(competitorPrice)})
          </h4>
          <p style={{ marginBottom: '4px' }}>
            Jika Anda mengikuti harga kompetitor, dana bersih diterima Anda adalah <strong>{rupiah.format(compResult.sellerReceivesAfterTaxAndAffiliate)}</strong>.
          </p>
          <p>
            Profit bersih Anda akan menjadi <strong>{rupiah.format(compResult.profit)}</strong> (Margin <strong>{formatPercent(compResult.margin)}</strong>) dibanding HPP modal Anda.
          </p>
        </div>
      )}
    </section>
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
