# 📊 DecodeLabs - Data Analytics Project 3: SQL Data Analysis

**Batch: 2026 | Powered by DecodeLabs**

---

## 📋 Project Overview

This project demonstrates **SQL Data Analysis** on an e-commerce orders dataset. Using Python with SQLite, the project loads data from an Excel spreadsheet into a relational database and executes **28 comprehensive SQL queries** to extract meaningful business insights.

### 🎯 Goal
Use SQL queries to extract actionable insights from a real-world e-commerce dataset.

### 📌 Key Requirements Met
- ✅ **SELECT queries** — Basic data retrieval and column selection
- ✅ **WHERE clause** — Data filtering with multiple conditions
- ✅ **ORDER BY** — Sorting results (ASC/DESC, multi-column)
- ✅ **GROUP BY** — Grouping data for aggregation
- ✅ **Aggregations** — COUNT, SUM, AVG with ROUND
- ✅ **HAVING** — Filtering grouped data
- ✅ **Advanced** — CASE WHEN, COALESCE, LIKE, IN, BETWEEN, subqueries

---

## 📂 Project Structure

```
📦 Decodelabs Data Analytics Project/
├── 📄 sql_analysis.py              # Main Python script (loads data + runs queries)
├── 📄 sql_queries.sql              # Standalone SQL queries reference file
├── 📄 sql_analysis_output.txt      # Complete output of all query results
├── 📊 Dataset for Data Analytics (3).xlsx  # Source dataset (1,200 orders)
├── 🗄️ ecommerce_orders.db          # SQLite database (auto-generated)
├── 📄 README.md                    # This file
└── 📄 Data Analytics Project 3 (1).md  # Project brief
```

---

## 📊 Dataset Description

| Field | Type | Description |
|-------|------|-------------|
| OrderID | TEXT | Unique order identifier (ORD200000 - ORD201199) |
| Date | TEXT | Order date (2023-01-01 to 2025-06-30) |
| CustomerID | TEXT | Customer identifier |
| Product | TEXT | Product category (7 types) |
| Quantity | INTEGER | Items ordered (1-5) |
| UnitPrice | REAL | Price per unit ($11.39 - $699.93) |
| ShippingAddress | TEXT | Delivery address |
| PaymentMethod | TEXT | Payment type (5 methods) |
| OrderStatus | TEXT | Order status (5 statuses) |
| TrackingNumber | TEXT | Shipping tracking number |
| ItemsInCart | INTEGER | Total items in customer's cart |
| CouponCode | TEXT | Discount code used (if any) |
| ReferralSource | TEXT | Marketing channel (5 sources) |
| TotalPrice | REAL | Total order value |

### Key Data Points
- **Total Records:** 1,200 orders
- **Products:** Chair, Desk, Laptop, Monitor, Phone, Printer, Tablet
- **Payment Methods:** Cash, Credit Card, Debit Card, Gift Card, Online
- **Order Statuses:** Cancelled, Delivered, Pending, Returned, Shipped
- **Coupon Codes:** FREESHIP, SAVE10, WINTER15
- **Referral Sources:** Email, Facebook, Google, Instagram, Referral

---

## 🔍 SQL Queries Summary

### Section A: SELECT Queries (Basic Data Retrieval)
| # | Query | Purpose |
|---|-------|---------|
| 1 | `SELECT * FROM Orders LIMIT 10` | Preview dataset structure |
| 2 | `SELECT OrderID, Product, Quantity...` | Select specific columns |
| 3 | `SELECT DISTINCT Product` | List all unique products |
| 4 | `SELECT DISTINCT PaymentMethod` | List all payment methods |

### Section B: WHERE Clause (Filtering Data)
| # | Query | Purpose |
|---|-------|---------|
| 5 | `WHERE OrderStatus = 'Delivered'` | Filter delivered orders |
| 6 | `WHERE Product = 'Laptop' AND TotalPrice > 500` | Compound conditions |
| 7 | `WHERE PaymentMethod IN (...)` | IN operator |
| 8 | `WHERE Date BETWEEN '2024-01-01' AND '2024-01-31'` | Date range filtering |
| 9 | `WHERE OrderStatus IN ('Cancelled', 'Returned')` | Problem orders |
| 10 | `WHERE CouponCode LIKE 'SAVE%'` | Pattern matching |

### Section C: ORDER BY (Sorting Data)
| # | Query | Purpose |
|---|-------|---------|
| 11 | `ORDER BY TotalPrice DESC` | Highest value orders |
| 12 | `ORDER BY Date DESC` | Most recent orders |
| 13 | `ORDER BY Product ASC, TotalPrice DESC` | Multi-column sorting |

### Section D: GROUP BY with Aggregations
| # | Query | Purpose |
|---|-------|---------|
| 14 | `COUNT(*) ... GROUP BY Product` | Orders per product |
| 15 | `SUM(TotalPrice) ... GROUP BY Product` | Revenue per product |
| 16 | `AVG(TotalPrice) ... GROUP BY Product` | Avg order value per product |
| 17 | `GROUP BY PaymentMethod` | Revenue by payment method |
| 18 | `GROUP BY OrderStatus` | Order distribution with percentage |
| 19 | `GROUP BY Month (2024)` | Monthly revenue trends |
| 20 | `GROUP BY ReferralSource` | Marketing channel analysis |

### Section E: HAVING Clause (Filtering Grouped Data)
| # | Query | Purpose |
|---|-------|---------|
| 21 | `HAVING AVG(TotalPrice) > 800` | High-value product categories |
| 22 | `HAVING COUNT(*) > 3` | Repeat/loyal customers |
| 23 | `HAVING SUM(TotalPrice) > 200000` | High-revenue payment methods |

### Section F: Advanced Queries
| # | Query | Purpose |
|---|-------|---------|
| 24 | `COALESCE + GROUP BY CouponCode` | Coupon effectiveness |
| 25 | `GROUP BY Year` | Year-over-year comparison |
| 26 | `GROUP BY Product, OrderStatus` | Cross-tabulation analysis |
| 27 | `GROUP BY CustomerID ORDER BY TotalSpent` | Top spending customers |
| 28 | `CASE WHEN + Percentage calculation` | Cancellation rate by product |

---

## 📈 Key Insights Discovered

### Revenue Overview
- **Grand Total Revenue:** $1,264,761.96
- **Average Order Value:** $1,053.97
- **Total Orders:** 1,200 across 1,189 unique customers

### Top Products by Revenue
1. Printer — Highest total revenue
2. Laptop — Highest average order value
3. Tablet — Consistent performer

### Payment Method Analysis
- All 5 payment methods contribute significantly (~$240K-$270K each)
- Relatively even distribution across payment types

### Order Status Distribution
- Orders are distributed across all 5 statuses
- Cancellation rates range from ~19% to ~25% by product
- Chair has the highest cancellation rate (25.28%)

### Marketing Channels
- All 5 referral sources contribute approximately equal revenue share (~20% each)
- Email, Facebook, Google, Instagram, and Referral all drive meaningful traffic

---

## 🚀 How to Run

### Prerequisites
- Python 3.x
- `openpyxl` library (`pip install openpyxl`)

### Execution Steps

```bash
# 1. Install dependency
pip install openpyxl

# 2. Run the SQL analysis script
python sql_analysis.py

# 3. (Optional) Save output to file
python sql_analysis.py > sql_analysis_output.txt
```

### Expected Output
- Console displays all 28 query results with formatted tables
- SQLite database `ecommerce_orders.db` is created automatically
- Output text file captures all results for documentation

---

## 🛠️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| **Python 3** | Programming language |
| **SQLite3** | Relational database engine (built into Python) |
| **openpyxl** | Excel file reading |
| **SQL** | Structured Query Language for data analysis |

---

## 📝 Skills Demonstrated

- **SQL Fundamentals** — CREATE TABLE, INSERT, SELECT
- **Data Filtering** — WHERE, AND, OR, IN, BETWEEN, LIKE
- **Data Sorting** — ORDER BY (ASC, DESC, multi-column)
- **Data Aggregation** — COUNT, SUM, AVG, ROUND
- **Data Grouping** — GROUP BY with multiple columns
- **Grouped Filtering** — HAVING clause
- **Advanced SQL** — CASE WHEN, COALESCE, subqueries, percentage calculations
- **Data Loading** — Excel to SQLite ETL pipeline

---

## 📸 Screenshots

The complete output of all 28 queries is saved in `sql_analysis_output.txt` for reference and documentation purposes.

---

## 👤 Author

**DecodeLabs Batch 2026**  
Industrial Training Kit — Data Analytics Track

---

## 📄 License

This project is part of the DecodeLabs Industrial Training Program.
