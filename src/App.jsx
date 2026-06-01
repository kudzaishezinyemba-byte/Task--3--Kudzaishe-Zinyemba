import { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend
} from "recharts";
import {
  TrendingUp, BarChart3, PieChart as PieIcon, AlertTriangle, Lightbulb,
  DollarSign, ShoppingCart, Percent, Layers, ArrowUpDown,
  Filter, Calendar, ChevronRight, CheckCircle2, ShieldAlert,
  Search, RefreshCw, Landmark, Share2, Info
} from "lucide-react";

// Themes & Palette Colors
const TEAL = "#00C9B1";
const ORANGE = "#FF6B35";
const NAVY = "#0D1B2A";
const SLATE = "#1E2D3D";
const LIGHT = "#A8C5DA";
const GOLD = "#F5C842";
const PURPLE = "#7B61FF";
const TEAL_LIGHT = "#00E5CC";

const COLORS_PIE = [ORANGE, "#E07B54", GOLD, TEAL, TEAL_LIGHT];

// Datasets
const productRevenueRaw = [
  { product: "Chair", revenue: 195620, orders: 178, avgOrder: 1099, rate: 41.0 },
  { product: "Printer", revenue: 195613, orders: 181, avgOrder: 1081, rate: 40.3 },
  { product: "Laptop", revenue: 192127, orders: 173, avgOrder: 1111, rate: 42.8 },
  { product: "Tablet", revenue: 186569, orders: 179, avgOrder: 1042, rate: 43.0 },
  { product: "Monitor", revenue: 175651, orders: 163, avgOrder: 1078, rate: 43.6 },
  { product: "Desk", revenue: 167460, orders: 170, avgOrder: 985, rate: 39.4 },
  { product: "Phone", revenue: 151722, orders: 156, avgOrder: 973, rate: 39.7 },
];

const orderStatus = [
  { status: "Cancelled", count: 250, color: ORANGE },
  { status: "Returned", count: 247, color: "#E07B54" },
  { status: "Pending", count: 237, color: GOLD },
  { status: "Shipped", count: 235, color: TEAL },
  { status: "Delivered", count: 231, color: TEAL_LIGHT },
];

const referralRevenue = [
  { source: "Instagram", revenue: 275285 },
  { source: "Email", revenue: 261809 },
  { source: "Google", revenue: 250441 },
  { source: "Facebook", revenue: 250411 },
  { source: "Referral", revenue: 226816 },
];

const monthlyData = [
  { month: "Jan'23", orders: 47, revenue: 56686 },
  { month: "Feb'23", orders: 37, revenue: 40118 },
  { month: "Mar'23", orders: 43, revenue: 48609 },
  { month: "Apr'23", orders: 31, revenue: 27752 },
  { month: "May'23", orders: 49, revenue: 63837 },
  { month: "Jun'23", orders: 45, revenue: 49500 },
  { month: "Jul'23", orders: 44, revenue: 42821 },
  { month: "Aug'23", orders: 51, revenue: 54352 },
  { month: "Sep'23", orders: 29, revenue: 29527 },
  { month: "Oct'23", orders: 47, revenue: 52608 },
  { month: "Nov'23", orders: 41, revenue: 43080 },
  { month: "Dec'23", orders: 46, revenue: 43755 },
  { month: "Jan'24", orders: 32, revenue: 38528 },
  { month: "Feb'24", orders: 32, revenue: 36910 },
  { month: "Mar'24", orders: 36, revenue: 36031 },
  { month: "Apr'24", orders: 50, revenue: 49613 },
  { month: "May'24", orders: 34, revenue: 27909 },
  { month: "Jun'24", orders: 53, revenue: 68069 },
  { month: "Jul'24", orders: 43, revenue: 42964 },
  { month: "Aug'24", orders: 28, revenue: 31991 },
  { month: "Sep'24", orders: 44, revenue: 39795 },
  { month: "Oct'24", orders: 31, revenue: 37227 },
  { month: "Nov'24", orders: 35, revenue: 32414 },
  { month: "Dec'24", orders: 41, revenue: 38786 },
  { month: "Jan'25", orders: 27, revenue: 29099 },
  { month: "Feb'25", orders: 37, revenue: 35318 },
  { month: "Mar'25", orders: 49, revenue: 39201 },
  { month: "Apr'25", orders: 32, revenue: 31821 },
  { month: "May'25", orders: 37, revenue: 43397 },
  { month: "Jun'25", orders: 49, revenue: 53047 },
];

const paymentData = [
  { method: "Online", count: 258 },
  { method: "Cash", count: 246 },
  { method: "Credit Card", count: 234 },
  { method: "Debit Card", count: 232 },
  { method: "Gift Card", count: 230 },
];

const outliersRaw = [
  { id: "ORD200107", product: "Printer", qty: 5, unitPrice: 670.75, totalPrice: 3353.75, year: "2023" },
  { id: "ORD200326", product: "Laptop", qty: 5, unitPrice: 670.48, totalPrice: 3352.40, year: "2023" },
  { id: "ORD200328", product: "Tablet", qty: 5, unitPrice: 674.04, totalPrice: 3370.20, year: "2023" },
  { id: "ORD200469", product: "Chair", qty: 5, unitPrice: 676.98, totalPrice: 3384.90, year: "2023" },
  { id: "ORD200632", product: "Laptop", qty: 5, unitPrice: 678.16, totalPrice: 3390.80, year: "2023" },
  { id: "ORD200789", product: "Tablet", qty: 5, unitPrice: 691.28, totalPrice: 3456.40, year: "2024" },
  { id: "ORD201065", product: "Printer", qty: 5, unitPrice: 666.80, totalPrice: 3334.00, year: "2024" },
  { id: "ORD201122", product: "Monitor", qty: 5, unitPrice: 678.19, totalPrice: 3390.95, year: "2024" },
];

const insightsList = [
  {
    title: "🔴 41.4% Orders Fail to Complete",
    body: "Cancelled (20.8%) and Returned (20.6%) together represent a massive revenue leak. This is the single most critical problem. Root-cause analysis per product category is recommended immediately.",
    color: ORANGE,
    priority: "High",
    category: "Operations"
  },
  {
    title: "📊 Mean vs Median Gap Signals Skew",
    body: "Mean order value ($1,054) is 28% higher than the median ($824). This right-skewed distribution means a few high-value orders inflate the average. Use median for internal benchmarking; use mean only for total revenue projections.",
    color: GOLD,
    priority: "Medium",
    category: "Financial"
  },
  {
    title: "💡 Quantity & Unit Price Drive Revenue",
    body: "Correlation analysis: UnitPrice vs TotalPrice = 0.717 (strong), Quantity vs TotalPrice = 0.615 (strong). ItemsInCart vs TotalPrice = 0.393 (moderate). Focus upselling strategies on unit price growth, not just volume.",
    color: TEAL,
    priority: "Medium",
    category: "Sales"
  },
  {
    title: "📱 Instagram is the #1 Revenue Channel",
    body: "Instagram-sourced customers generate $275K (21.8% of total revenue), leading all channels. Double down on Instagram content and paid campaigns. Referral links underperform by 21% — revisit the referral incentive program.",
    color: PURPLE,
    priority: "Medium",
    category: "Marketing"
  },
  {
    title: "🖥️ Monitor & Tablet Need Quality Review",
    body: "43.6% and 43.0% of Monitor and Tablet orders are Cancelled or Returned — far above the 39–41% range for other products. Investigate product descriptions, quality control, and return reasons for these SKUs.",
    color: ORANGE,
    priority: "High",
    category: "Operations"
  },
  {
    title: "📅 Q3 is a Recurring Revenue Dip",
    body: "September is consistently weak across 2023 and 2024 (29 and 28 orders respectively). Plan targeted promotions for August–September to counteract seasonal slowdown. June is consistently the strongest month.",
    color: GOLD,
    priority: "Medium",
    category: "Sales"
  },
  {
    title: "📦 Coupon Usage Has Minimal Effect",
    body: "Orders with coupons average $1,058 vs $1,043 without — a negligible 1.4% difference. Coupon strategy may not be driving meaningful revenue uplift. Consider A/B testing coupon structures or targeting high-AOV segments instead.",
    color: TEAL,
    priority: "Low",
    category: "Sales"
  },
  {
    title: "🏆 2025 Shows Positive Recovery",
    body: "Revenue climbed from $29K (Jan 2025) to $53K (Jun 2025). Order volume is recovering after 2024 dips. This trend validates current growth strategies and should be monitored monthly.",
    color: TEAL_LIGHT,
    priority: "Low",
    category: "Financial"
  },
];

// Helper formats
const fmtRevenue = (v) => `$${(v / 1000).toFixed(0)}K`;
const fmtFullRevenue = (v) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

// Stat Card component with interactive state styles
const StatCard = ({ label, value, sub, accent, icon: Icon, onClick, isActive }) => (
  <div 
    onClick={onClick}
    className="stat-card animate-fade-in"
    style={{
      "--accent-color": accent || TEAL,
      "--accent-border-color": (accent || TEAL) + "bb",
      "--accent-glow-color": (accent || TEAL) + "33",
      cursor: onClick ? "pointer" : "default",
      borderWidth: isActive ? "1px" : "1px",
      borderColor: isActive ? (accent || TEAL) : "rgba(255, 255, 255, 0.05)",
      background: isActive ? "rgba(30, 45, 61, 0.85)" : "rgba(30, 45, 61, 0.55)"
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
      {Icon && (
        <div style={{ padding: 8, borderRadius: 8, background: (accent || TEAL) + "22", color: accent || TEAL }}>
          <Icon size={18} />
        </div>
      )}
    </div>
    {sub && <div className="stat-sub">{sub}</div>}
  </div>
);

const SectionTitle = ({ children, accent, icon: Icon }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
    <div style={{ width: 4, height: 24, background: accent || TEAL, borderRadius: 2 }} />
    {Icon && <Icon size={20} style={{ color: accent || TEAL }} />}
    <h2 style={{ margin: 0, color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: 0.5 }}>{children}</h2>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="recharts-default-tooltip">
        <p className="recharts-tooltip-label">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color || TEAL, margin: "4px 0 0", fontWeight: 700, fontSize: 14 }}>
            {p.name}: {typeof p.value === "number" && p.value > 1000 ? `$${p.value.toLocaleString()}` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function EDAReport() {
  const [activeSection, setActiveSection] = useState("overview");
  
  // Interactivity States
  const [selectedYear, setSelectedYear] = useState("All");
  const [pieClickedStatus, setPieClickedStatus] = useState(null);
  const [clickedMonthDetails, setClickedMonthDetails] = useState(null);
  const [productSearch, setProductSearch] = useState("");
  const [productSortField, setProductSortField] = useState("revenue");
  const [productSortAsc, setProductSortAsc] = useState(false);
  const [outlierSortField, setOutlierSortField] = useState("totalPrice");
  const [outlierSortAsc, setOutlierSortAsc] = useState(false);
  const [insightPriorityFilter, setInsightPriorityFilter] = useState("All");
  const [insightSearch, setInsightSearch] = useState("");

  const nav = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "products", label: "Products", icon: BarChart3 },
    { id: "trends", label: "Trends", icon: TrendingUp },
    { id: "risk", label: "Risk", icon: ShieldAlert },
    { id: "insights", label: "Insights", icon: Lightbulb },
  ];

  // Helper to parse year from months (e.g. Jan'23 -> 2023)
  const getYearFromMonth = (monthStr) => {
    if (monthStr.endsWith("'23")) return "2023";
    if (monthStr.endsWith("'24")) return "2024";
    if (monthStr.endsWith("'25")) return "2025";
    return "All";
  };

  // Filter monthly data based on Year
  const filteredMonthlyData = useMemo(() => {
    if (selectedYear === "All") return monthlyData;
    return monthlyData.filter(d => getYearFromMonth(d.month) === selectedYear);
  }, [selectedYear]);

  // Dynamically calculate Stats based on Year
  const stats = useMemo(() => {
    const totalOrders = filteredMonthlyData.reduce((sum, d) => sum + d.orders, 0);
    const totalRevenue = filteredMonthlyData.reduce((sum, d) => sum + d.revenue, 0);
    const meanOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    
    // Scale or adjust items depending on active data
    let outliersCount = 8;
    if (selectedYear === "2023") outliersCount = 5;
    if (selectedYear === "2024") outliersCount = 3;
    if (selectedYear === "2025") outliersCount = 0;

    const missingValues = Math.round(totalOrders * 0.258); // 25.8% missing CouponCode

    return {
      totalOrders,
      totalRevenue,
      meanOrderValue,
      outliersCount,
      missingValues
    };
  }, [filteredMonthlyData, selectedYear]);

  // Product sorting/filtering logic
  const sortedProducts = useMemo(() => {
    const searchLower = productSearch.toLowerCase();
    const filtered = productRevenueRaw.filter(p => p.product.toLowerCase().includes(searchLower));
    
    return filtered.sort((a, b) => {
      let aVal = a[productSortField];
      let bVal = b[productSortField];
      if (typeof aVal === 'string') {
        return productSortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return productSortAsc ? aVal - bVal : bVal - aVal;
    });
  }, [productSearch, productSortField, productSortAsc]);

  const handleProductSort = (field) => {
    if (productSortField === field) {
      setProductSortAsc(!productSortAsc);
    } else {
      setProductSortField(field);
      setProductSortAsc(false);
    }
  };

  // Outliers sorting/filtering logic
  const sortedOutliers = useMemo(() => {
    const filtered = outliersRaw.filter(o => selectedYear === "All" || o.year === selectedYear);
    return filtered.sort((a, b) => {
      let aVal = a[outlierSortField];
      let bVal = b[outlierSortField];
      if (typeof aVal === 'string') {
        return outlierSortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return outlierSortAsc ? aVal - bVal : bVal - aVal;
    });
  }, [selectedYear, outlierSortField, outlierSortAsc]);

  const handleOutlierSort = (field) => {
    if (outlierSortField === field) {
      setOutlierSortAsc(!outlierSortAsc);
    } else {
      setOutlierSortField(field);
      setOutlierSortAsc(false);
    }
  };

  // Insights filtering logic
  const filteredInsights = useMemo(() => {
    return insightsList.filter(item => {
      const matchesPriority = insightPriorityFilter === "All" || item.priority === insightPriorityFilter;
      const matchesSearch = item.title.toLowerCase().includes(insightSearch.toLowerCase()) || 
                            item.body.toLowerCase().includes(insightSearch.toLowerCase()) ||
                            item.category.toLowerCase().includes(insightSearch.toLowerCase());
      return matchesPriority && matchesSearch;
    });
  }, [insightPriorityFilter, insightSearch]);

  return (
    <div style={{ background: NAVY, minHeight: "100vh", color: LIGHT, paddingBottom: 60 }}>
      
      {/* Premium Gradient Header */}
      <header style={{
        background: `linear-gradient(135deg, ${SLATE} 0%, #060c14 100%)`,
        borderBottom: `1px solid ${TEAL}33`,
        padding: "28px 32px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
      }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: TEAL, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>
              <span>DecodeLabs · Project 2</span>
              <span style={{ opacity: 0.4 }}>|</span>
              <span style={{ color: GOLD }}>Advanced Analytics</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900, letterSpacing: -0.5, lineHeight: 1.1 }}>
              Exploratory Data Analysis
            </h1>
            <p style={{ margin: "8px 0 0", color: LIGHT, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={14} style={{ color: TEAL }} />
              E-Commerce Order Dataset · 1,200 records · Jan 2023 – Jun 2025
            </p>
          </div>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {/* Year Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(13,27,42,0.6)", padding: "6px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }}>
              <Filter size={13} style={{ color: TEAL }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: LIGHT }}>Year:</span>
              {["All", "2023", "2024", "2025"].map(yr => (
                <button
                  key={yr}
                  onClick={() => {
                    setSelectedYear(yr);
                    setClickedMonthDetails(null);
                  }}
                  style={{
                    background: selectedYear === yr ? TEAL : "transparent",
                    color: selectedYear === yr ? "#060c14" : LIGHT,
                    border: "none",
                    borderRadius: 6,
                    padding: "3px 8px",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  {yr}
                </button>
              ))}
            </div>

            {/* Total Revenue Box */}
            <div style={{
              background: TEAL + "18",
              border: `1px solid ${TEAL}55`,
              borderRadius: 12,
              padding: "10px 20px",
              textAlign: "right",
              minWidth: 150,
              boxShadow: `0 0 15px ${TEAL}11`
            }}>
              <div style={{ color: TEAL, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>Total Revenue</div>
              <div style={{ fontSize: 26, fontWeight: 900, fontFamily: "var(--font-mono)", color: "#fff" }}>
                {fmtFullRevenue(stats.totalRevenue)}
              </div>
            </div>
          </div>
        </div>

        {/* Custom Nav Bar */}
        <div style={{ maxWidth: 1140, margin: "20px auto 0", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {nav.map(n => {
              const NavIcon = n.icon;
              return (
                <button
                  key={n.id}
                  onClick={() => setActiveSection(n.id)}
                  className={`nav-button ${activeSection === n.id ? 'active' : ''}`}
                >
                  <NavIcon size={14} />
                  {n.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ padding: "32px 32px", maxWidth: 1140, margin: "0 auto" }}>

        {/* SECTION: OVERVIEW */}
        {activeSection === "overview" && (
          <div className="animate-fade-in">
            <SectionTitle icon={Layers}>Dataset Snapshot ({selectedYear === 'All' ? '2023 - 2025' : selectedYear})</SectionTitle>
            
            <div className="dashboard-grid" style={{ marginBottom: 32 }}>
              <StatCard label="Total Orders" value={stats.totalOrders.toLocaleString()} sub={`${selectedYear === 'All' ? "Jan 2023 - Jun 2025" : `Year ${selectedYear} Only`}`} icon={ShoppingCart} accent={TEAL} />
              <StatCard label="Mean Order Value" value={`$${stats.meanOrderValue.toLocaleString()}`} sub="Median: $824 (Base)" icon={DollarSign} accent={GOLD} />
              <StatCard label="Avg Unit Price" value="$356" sub="Range: $11 – $700" icon={Layers} accent={ORANGE} />
              <StatCard label="Missing Values" value={stats.missingValues.toString()} sub="CouponCode (25.8% Rate)" icon={AlertTriangle} accent={PURPLE} />
              <StatCard label="Outliers Found" value={stats.outliersCount.toString()} sub="TotalPrice > $3,330" icon={ShieldAlert} accent={ORANGE} />
            </div>

            <div className="dashboard-grid">
              {/* Descriptive Statistics */}
              <div className="glass-panel" style={{ gridColumn: "span 2" }}>
                <SectionTitle icon={Layers} accent={GOLD}>Numerical Fields Statistics</SectionTitle>
                <div className="table-container">
                  <table className="premium-table">
                    <thead>
                      <tr>
                        <th>Metric</th>
                        <th>Quantity</th>
                        <th>Unit Price ($)</th>
                        <th>Items In Cart</th>
                        <th>Total Price ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Count", "1,200", "1,200", "1,200", "1,200"],
                        ["Mean", "2.95", "356.41", "5.49", "1,053.97"],
                        ["Median", "3.00", "364.21", "5.00", "823.62"],
                        ["Std Dev", "1.41", "197.18", "2.28", "819.86"],
                        ["Min", "1", "11.39", "1", "11.39"],
                        ["Q1 (25th)", "2", "186.06", "4", "410.52"],
                        ["Q3 (75th)", "4", "521.57", "7", "1,578.48"],
                        ["Max", "5", "699.93", "10", "3,456.40"],
                      ].map(([m, ...vals], i) => (
                        <tr key={m} className={i % 2 === 0 ? "even-row" : ""}>
                          <td style={{ color: GOLD, fontWeight: 700 }}>{m}</td>
                          {vals.map((v, j) => (
                            <td key={j}>{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: 14, fontSize: 12, display: "flex", gap: 6, alignItems: "center", color: LIGHT }}>
                  <Info size={14} style={{ color: GOLD }} />
                  <span>The metrics show strong right-skewness (Mean total price $1,054 vs Median $823).</span>
                </div>
              </div>

              {/* Order Status Distribution */}
              <div className="glass-panel">
                <SectionTitle icon={PieIcon} accent={TEAL}>Order Statuses</SectionTitle>
                <div style={{ position: "relative", height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={orderStatus} 
                        dataKey="count" 
                        nameKey="status" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={75} 
                        paddingAngle={3}
                        onClick={(data) => setPieClickedStatus(data.status === pieClickedStatus ? null : data.status)}
                        style={{ cursor: "pointer" }}
                      >
                        {orderStatus.map((e, i) => (
                          <Cell 
                            key={e.status} 
                            fill={COLORS_PIE[i]} 
                            stroke={pieClickedStatus === e.status ? "#fff" : "none"}
                            strokeWidth={pieClickedStatus === e.status ? 2 : 0}
                            style={{ filter: pieClickedStatus === e.status ? "brightness(1.15)" : "none" }}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  {pieClickedStatus && (
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(13,27,42,0.9)",
                      padding: "6px 10px",
                      borderRadius: 8,
                      fontSize: 12,
                      textAlign: "center",
                      border: `1px solid ${TEAL}44`
                    }}>
                      Selected status: <strong style={{ color: TEAL }}>{pieClickedStatus}</strong> ({orderStatus.find(o => o.status === pieClickedStatus)?.count} orders)
                    </div>
                  )}
                </div>
                
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: LIGHT, marginBottom: 4 }}>
                    <span>Cancelled + Returned (41.4%)</span>
                    <span style={{ color: ORANGE, fontWeight: 700 }}>497 / 1,200</span>
                  </div>
                  <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: "41.4%", height: "100%", background: `linear-gradient(90deg, ${ORANGE}, #e07b54)` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Insights Cards */}
            <div style={{ marginTop: 24 }} className="glass-panel">
              <SectionTitle icon={Lightbulb} accent={TEAL}>Overview Insights</SectionTitle>
              <div className="insight-badge" style={{ "--badge-accent": ORANGE }}>
                <strong>Cancelled + Returned rate is critical (41.4%)</strong>. This creates a severe fulfillment risk that needs sorting.
              </div>
              <div className="insight-badge" style={{ "--badge-accent": TEAL }}>
                <strong>Under-delivered status (19.3%)</strong> is the lowest block of the orders pipeline, showing potential shipping delays.
              </div>
              <div className="insight-badge" style={{ "--badge-accent": GOLD }}>
                <strong>Coupon usage analysis</strong> shows it has negligible impact (only 1.4% change in average order values).
              </div>
            </div>
          </div>
        )}

        {/* SECTION: PRODUCTS */}
        {activeSection === "products" && (
          <div className="animate-fade-in">
            <div className="dashboard-grid">
              
              {/* Product Revenues Chart */}
              <div className="glass-panel" style={{ gridColumn: "span 2" }}>
                <SectionTitle icon={BarChart3}>Revenue by Product Category ($)</SectionTitle>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productRevenueRaw} margin={{ left: 10, right: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 197, 218, 0.1)" vertical={false} />
                      <XAxis dataKey="product" tick={{ fill: LIGHT, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={fmtRevenue} tick={{ fill: LIGHT, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                        {productRevenueRaw.map((e, i) => (
                          <Cell key={e.product} fill={i === 0 ? TEAL : i === 1 ? ORANGE : GOLD} opacity={i > 2 ? 0.75 : 1} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Referral Channels Revenue */}
              <div className="glass-panel">
                <SectionTitle icon={Share2} accent={GOLD}>Referral Channels</SectionTitle>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={referralRevenue} layout="vertical" margin={{ left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 197, 218, 0.1)" horizontal={false} />
                      <XAxis type="number" tickFormatter={fmtRevenue} tick={{ fill: LIGHT, fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis dataKey="source" type="category" tick={{ fill: LIGHT, fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="revenue" fill={GOLD} radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Interactive Sorted Products Table */}
            <div className="glass-panel" style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 14 }}>
                <SectionTitle icon={Layers} accent={TEAL}>Unified Products Metrics</SectionTitle>
                
                {/* Search Product */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(13,27,42,0.6)", padding: "6px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Search size={14} style={{ color: TEAL }} />
                  <input 
                    type="text" 
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search product..."
                    style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 12, width: 140 }}
                  />
                  {productSearch && (
                    <button onClick={() => setProductSearch("")} style={{ background: "transparent", border: "none", color: LIGHT, cursor: "pointer", fontSize: 10 }}>clear</button>
                  )}
                </div>
              </div>

              <div className="table-container">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleProductSort("product")}>
                        Product <ArrowUpDown size={11} style={{ marginLeft: 4 }} />
                      </th>
                      <th onClick={() => handleProductSort("revenue")}>
                        Revenue ($) <ArrowUpDown size={11} style={{ marginLeft: 4 }} />
                      </th>
                      <th onClick={() => handleProductSort("orders")}>
                        Total Orders <ArrowUpDown size={11} style={{ marginLeft: 4 }} />
                      </th>
                      <th onClick={() => handleProductSort("avgOrder")}>
                        Avg Order Value <ArrowUpDown size={11} style={{ marginLeft: 4 }} />
                      </th>
                      <th onClick={() => handleProductSort("rate")}>
                        Cancelled/Returned Rate <ArrowUpDown size={11} style={{ marginLeft: 4 }} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedProducts.map((p, idx) => (
                      <tr key={p.product} className={idx % 2 === 0 ? "even-row" : ""}>
                        <td style={{ color: "#fff", fontWeight: 600 }}>{p.product}</td>
                        <td>${p.revenue.toLocaleString()}</td>
                        <td>{p.orders}</td>
                        <td>${p.avgOrder}</td>
                        <td style={{ color: p.rate > 42 ? ORANGE : p.rate > 40 ? GOLD : TEAL, fontWeight: 700 }}>
                          {p.rate}%
                        </td>
                      </tr>
                    ))}
                    {sortedProducts.length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", color: LIGHT, padding: 20 }}>No products matched your search.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="glass-panel">
              <SectionTitle icon={Landmark} accent={ORANGE}>Payment Method Distribution</SectionTitle>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={paymentData} layout="vertical" margin={{ left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 197, 218, 0.1)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: LIGHT, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="method" type="category" tick={{ fill: LIGHT, fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
                    <Tooltip contentStyle={{ background: NAVY, border: `1px solid ${ORANGE}44`, borderRadius: 8 }} />
                    <Bar dataKey="count" fill={ORANGE} radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="insight-badge" style={{ "--badge-accent": ORANGE, marginTop: 14 }}>
                <strong>Online payments lead slightly</strong> (21.5%), but all five options are highly uniform (~20% each), suggesting wide customer optionality.
              </div>
            </div>
          </div>
        )}

        {/* SECTION: TRENDS */}
        {activeSection === "trends" && (
          <div className="animate-fade-in">
            
            {/* Main Trend Line Chart */}
            <div className="glass-panel" style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
                <SectionTitle icon={TrendingUp}>Monthly Revenue Trend ({selectedYear === 'All' ? '30 Months' : `${selectedYear} Only`})</SectionTitle>
                <div style={{ fontSize: 11, color: LIGHT }}>
                  <span style={{ color: TEAL }}>●</span> Click a data point to review month metrics
                </div>
              </div>

              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={filteredMonthlyData} 
                    margin={{ left: 10, right: 10 }}
                    onClick={(data) => {
                      if (data && data.activePayload && data.activePayload.length) {
                        setClickedMonthDetails(data.activePayload[0].payload);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 197, 218, 0.1)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: LIGHT, fontSize: 10 }} axisLine={false} tickLine={false} interval={selectedYear === "All" ? 2 : 0} />
                    <YAxis tickFormatter={fmtRevenue} tick={{ fill: LIGHT, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke={TEAL} 
                      strokeWidth={3} 
                      dot={{ r: 2, fill: TEAL }} 
                      activeDot={{ r: 6, fill: TEAL }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Clicked Month Details Drawer */}
              {clickedMonthDetails && (
                <div style={{
                  marginTop: 20,
                  background: "rgba(13,27,42,0.8)",
                  borderRadius: 12,
                  border: `1px solid ${TEAL}55`,
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 16,
                  animation: "fadeIn 0.25s ease-out"
                }}>
                  <div>
                    <div style={{ color: TEAL, fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>Monthly Metrics Detail</div>
                    <div style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>{clickedMonthDetails.month} Details</div>
                  </div>
                  <div style={{ display: "flex", gap: 30 }}>
                    <div>
                      <div style={{ color: LIGHT, fontSize: 11 }}>Revenue</div>
                      <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-mono)" }}>${clickedMonthDetails.revenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ color: LIGHT, fontSize: 11 }}>Total Orders</div>
                      <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-mono)" }}>{clickedMonthDetails.orders} orders</div>
                    </div>
                    <div>
                      <div style={{ color: LIGHT, fontSize: 11 }}>Average Order Price</div>
                      <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-mono)" }}>
                        ${Math.round(clickedMonthDetails.revenue / clickedMonthDetails.orders).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setClickedMonthDetails(null)}
                    style={{ background: "transparent", border: "none", color: ORANGE, cursor: "pointer", fontSize: 12, fontWeight: 600 }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* Monthly Volume Bars */}
            <div className="glass-panel" style={{ marginBottom: 32 }}>
              <SectionTitle icon={BarChart3}>Monthly Order Volume</SectionTitle>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredMonthlyData} margin={{ left: 10, right: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 197, 218, 0.1)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: LIGHT, fontSize: 10 }} axisLine={false} tickLine={false} interval={selectedYear === "All" ? 2 : 0} />
                    <YAxis tick={{ fill: LIGHT, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: NAVY, border: `1px solid ${ORANGE}44`, borderRadius: 8 }} />
                    <Bar dataKey="orders" fill={ORANGE} radius={[3, 3, 0, 0]} opacity={0.8} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Year over Year trends text */}
            <div className="glass-panel">
              <SectionTitle icon={Lightbulb} accent={GOLD}>Seasonal Observations</SectionTitle>
              <div className="insight-badge" style={{ "--badge-accent": TEAL }}>
                <strong>Revenue peaks consistently in mid-year</strong> (May 2023 at $63.8K, June 2024 at $68.1K) due to summer promotions.
              </div>
              <div className="insight-badge" style={{ "--badge-accent": ORANGE }}>
                <strong>Q3 Soft Spot</strong>: September experiences recurring dips in order counts (29 and 28 orders), representing a key marketing intervention window.
              </div>
              <div className="insight-badge" style={{ "--badge-accent": TEAL_LIGHT }}>
                <strong>Recovery Trend in 2025</strong>: Revenue climbs from $29K in Jan'25 to $53K in Jun'25, suggesting positive year-over-year recovery.
              </div>
            </div>
          </div>
        )}

        {/* SECTION: RISK & OUTLIERS */}
        {activeSection === "risk" && (
          <div className="animate-fade-in">
            <div className="dashboard-grid">
              
              {/* Product Bad rates */}
              <div className="glass-panel" style={{ gridColumn: "span 2" }}>
                <SectionTitle icon={ShieldAlert} accent={ORANGE}>Cancelled + Returned Rate by Product (%)</SectionTitle>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productRevenueRaw} layout="vertical" margin={{ left: -10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(168, 197, 218, 0.1)" horizontal={false} />
                      <XAxis type="number" tickFormatter={v => `${v}%`} tick={{ fill: LIGHT, fontSize: 11 }} axisLine={false} tickLine={false} domain={[30, 48]} />
                      <YAxis dataKey="product" type="category" tick={{ fill: LIGHT, fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
                      <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: NAVY, border: `1px solid ${ORANGE}44`, borderRadius: 8 }} />
                      <Bar dataKey="rate" radius={[0, 6, 6, 0]}>
                        {productRevenueRaw.map((e, i) => (
                          <Cell key={e.product} fill={e.rate > 42 ? ORANGE : e.rate > 40 ? GOLD : TEAL} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* IQR Fence box */}
              <div className="glass-panel" style={{ background: "linear-gradient(135deg, rgba(255,107,53,0.1), rgba(30,45,61,0.4))", borderColor: `${ORANGE}33` }}>
                <SectionTitle icon={Info} accent={ORANGE}>IQR Outlier Boundary</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 8 }}>
                    <span>Q1 (25th percentile)</span>
                    <strong style={{ color: "#fff", fontFamily: "var(--font-mono)" }}>$410.52</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 8 }}>
                    <span>Q3 (75th percentile)</span>
                    <strong style={{ color: "#fff", fontFamily: "var(--font-mono)" }}>$1,578.48</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 8 }}>
                    <span>IQR Range</span>
                    <strong style={{ color: GOLD, fontFamily: "var(--font-mono)" }}>$1,167.95</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 8 }}>
                    <span>Upper Outlier Fence</span>
                    <strong style={{ color: ORANGE, fontFamily: "var(--font-mono)" }}>$3,330.41</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 4 }}>
                    <span>Outliers Detected</span>
                    <strong style={{ color: ORANGE, fontFamily: "var(--font-mono)" }}>8 Orders</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Outliers Table */}
            <div className="glass-panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 14 }}>
                <SectionTitle icon={Layers} accent={ORANGE}>Outlier Transactions (TotalPrice &gt; $3,330)</SectionTitle>
                <div style={{ fontSize: 12, color: LIGHT }}>
                  Active filter: <strong style={{ color: ORANGE }}>{selectedYear === "All" ? "All Years" : `Year ${selectedYear}`}</strong>
                </div>
              </div>

              <div className="table-container">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleOutlierSort("id")}>
                        Order ID <ArrowUpDown size={11} style={{ marginLeft: 4 }} />
                      </th>
                      <th onClick={() => handleOutlierSort("product")}>
                        Product <ArrowUpDown size={11} style={{ marginLeft: 4 }} />
                      </th>
                      <th onClick={() => handleOutlierSort("qty")}>
                        Qty <ArrowUpDown size={11} style={{ marginLeft: 4 }} />
                      </th>
                      <th onClick={() => handleOutlierSort("unitPrice")}>
                        Unit Price <ArrowUpDown size={11} style={{ marginLeft: 4 }} />
                      </th>
                      <th onClick={() => handleOutlierSort("totalPrice")}>
                        Total Price <ArrowUpDown size={11} style={{ marginLeft: 4 }} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedOutliers.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? "even-row" : ""}>
                        <td style={{ color: GOLD, fontWeight: 700 }}>{row.id}</td>
                        <td style={{ color: "#fff" }}>{row.product}</td>
                        <td>{row.qty}</td>
                        <td>${row.unitPrice.toFixed(2)}</td>
                        <td style={{ color: ORANGE, fontWeight: 700 }}>${row.totalPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                    {sortedOutliers.length === 0 && (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", color: LIGHT, padding: 20 }}>No outliers found for the active year.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="insight-badge" style={{ "--badge-accent": GOLD, marginTop: 16 }}>
                <strong>Outlier pattern match:</strong> All 8 transactions represent maximum quantity orders (5 items) of premium items (Unit Price &gt; $666). These represent high-value bulk purchases (likely B2B) and should not be deleted from the database.
              </div>
            </div>
          </div>
        )}

        {/* SECTION: INSIGHTS & RECOMMENDATIONS */}
        {activeSection === "insights" && (
          <div className="animate-fade-in">
            <div className="glass-panel" style={{ marginBottom: 32 }}>
              
              {/* Insight Search and Priority Filter Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
                <SectionTitle icon={Lightbulb} accent={TEAL}>Key Findings & Business Recommendations</SectionTitle>
                
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  {/* Category Filter */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(13,27,42,0.6)", padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: 11, color: LIGHT }}>Priority:</span>
                    {["All", "High", "Medium", "Low"].map(pr => (
                      <button
                        key={pr}
                        onClick={() => setInsightPriorityFilter(pr)}
                        style={{
                          background: insightPriorityFilter === pr ? TEAL : "transparent",
                          color: insightPriorityFilter === pr ? "#060c14" : LIGHT,
                          border: "none",
                          borderRadius: 4,
                          padding: "2px 6px",
                          fontSize: 10,
                          fontWeight: 700,
                          cursor: "pointer"
                        }}
                      >
                        {pr}
                      </button>
                    ))}
                  </div>

                  {/* Search Insight */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(13,27,42,0.6)", padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)" }}>
                    <Search size={12} style={{ color: TEAL }} />
                    <input 
                      type="text" 
                      value={insightSearch}
                      onChange={(e) => setInsightSearch(e.target.value)}
                      placeholder="Search findings..."
                      style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 11, width: 120 }}
                    />
                  </div>
                </div>
              </div>

              {/* Insights List Rendering */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {filteredInsights.map((item, idx) => (
                  <div 
                    key={idx} 
                    style={{
                      background: "rgba(30, 45, 61, 0.4)",
                      borderRadius: 12,
                      padding: "20px",
                      borderLeft: `4px solid ${item.color}`,
                      borderTop: "1px solid rgba(255,255,255,0.03)",
                      borderRight: "1px solid rgba(255,255,255,0.03)",
                      borderBottom: "1px solid rgba(255,255,255,0.03)",
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                      transition: "all 0.2s ease-out"
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: item.color }}>{item.title}</div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <span style={{ fontSize: 10, background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: 4, textTransform: "uppercase" }}>{item.category}</span>
                          <span style={{ 
                            fontSize: 10, 
                            background: item.priority === "High" ? `${ORANGE}22` : item.priority === "Medium" ? `${GOLD}22` : `${TEAL}22`, 
                            color: item.priority === "High" ? ORANGE : item.priority === "Medium" ? GOLD : TEAL,
                            padding: "2px 6px", 
                            borderRadius: 4, 
                            fontWeight: 700 
                          }}>
                            {item.priority} Priority
                          </span>
                        </div>
                      </div>
                      <div style={{ color: LIGHT, fontSize: 13, lineHeight: 1.7 }}>{item.body}</div>
                    </div>
                  </div>
                ))}
                {filteredInsights.length === 0 && (
                  <div style={{ textAlign: "center", padding: "40px", color: LIGHT }}>No insights match your active search or priority filters.</div>
                )}
              </div>
            </div>

            {/* Verdict block */}
            <div style={{
              background: `linear-gradient(135deg, ${TEAL}18, ${NAVY})`,
              border: `1px solid ${TEAL}33`,
              borderRadius: 16,
              padding: 28,
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
            }} className="animate-fade-in">
              <div style={{ color: TEAL, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Strategic Verdict</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.6, maxWidth: 800, margin: "0 auto 16px" }}>
                "The data reveals a healthy revenue base with serious fulfilment risk. <br />
                <span style={{ color: TEAL }}>Fix returns. Leverage Instagram. Prepare for Q3.</span>"
              </div>
              
              <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginTop: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#fff" }}>
                  <CheckCircle2 size={16} style={{ color: TEAL }} />
                  <span>Fix Returns Pipeline</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#fff" }}>
                  <CheckCircle2 size={16} style={{ color: TEAL }} />
                  <span>Grow Instagram Channels</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#fff" }}>
                  <CheckCircle2 size={16} style={{ color: TEAL }} />
                  <span>Promotional calendar for Q3 Dips</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Premium Footer */}
      <footer style={{ 
        textAlign: "center", 
        padding: "30px 32px 0", 
        color: "#637a90", 
        fontSize: 12, 
        borderTop: "1px solid rgba(168, 197, 218, 0.08)", 
        maxWidth: 1140, 
        margin: "40px auto 0" 
      }}>
        <div>DecodeLabs · Data Analytics Internship 2026 · EDA Project 2 Dashboard</div>
        <div style={{ marginTop: 4, opacity: 0.6 }}>Responsive React & Recharts Edition</div>
      </footer>
    </div>
  );
}
