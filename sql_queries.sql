-- ==============================================================================
-- DecodeLabs - Data Analytics Project 3: SQL Data Analysis
-- Batch: 2026
-- Dataset: Dataset for Data Analytics (3).xlsx
-- Database: ecommerce_orders.db (SQLite)
-- Table: Orders (1,200 records, 14 columns)
-- ==============================================================================

-- ==============================================================================
-- TABLE SCHEMA
-- ==============================================================================
-- CREATE TABLE Orders (
--     OrderID TEXT PRIMARY KEY,
--     Date TEXT,
--     CustomerID TEXT,
--     Product TEXT,
--     Quantity INTEGER,
--     UnitPrice REAL,
--     ShippingAddress TEXT,
--     PaymentMethod TEXT,
--     OrderStatus TEXT,
--     TrackingNumber TEXT,
--     ItemsInCart INTEGER,
--     CouponCode TEXT,
--     ReferralSource TEXT,
--     TotalPrice REAL
-- );


-- ==============================================================================
-- SECTION A: SELECT QUERIES - Basic Data Retrieval
-- ==============================================================================

-- Query 1: View First 10 Orders
SELECT * FROM Orders LIMIT 10;

-- Query 2: Select Specific Columns (Pricing Focus)
SELECT OrderID, Product, Quantity, UnitPrice, TotalPrice
FROM Orders
LIMIT 10;

-- Query 3: All Unique Products
SELECT DISTINCT Product
FROM Orders
ORDER BY Product;

-- Query 4: All Payment Methods Available
SELECT DISTINCT PaymentMethod
FROM Orders
ORDER BY PaymentMethod;


-- ==============================================================================
-- SECTION B: WHERE CLAUSE - Filtering Data
-- ==============================================================================

-- Query 5: All Delivered Orders
SELECT OrderID, Product, CustomerID, TotalPrice, OrderStatus
FROM Orders
WHERE OrderStatus = 'Delivered'
LIMIT 15;

-- Query 6: Laptop Orders Over $500
SELECT OrderID, Product, Quantity, UnitPrice, TotalPrice
FROM Orders
WHERE Product = 'Laptop' AND TotalPrice > 500
ORDER BY TotalPrice DESC
LIMIT 10;

-- Query 7: Orders Paid via Credit Card or Debit Card (IN operator)
SELECT OrderID, Product, PaymentMethod, TotalPrice
FROM Orders
WHERE PaymentMethod IN ('Credit Card', 'Debit Card')
LIMIT 15;

-- Query 8: Orders Placed in January 2024 (BETWEEN operator)
SELECT OrderID, Date, Product, TotalPrice
FROM Orders
WHERE Date BETWEEN '2024-01-01' AND '2024-01-31'
ORDER BY Date;

-- Query 9: Cancelled and Returned Orders
SELECT OrderID, Product, OrderStatus, TotalPrice, PaymentMethod
FROM Orders
WHERE OrderStatus IN ('Cancelled', 'Returned')
ORDER BY TotalPrice DESC
LIMIT 15;

-- Query 10: Orders with SAVE Coupon (LIKE operator)
SELECT OrderID, Product, CouponCode, TotalPrice
FROM Orders
WHERE CouponCode LIKE 'SAVE%'
LIMIT 10;


-- ==============================================================================
-- SECTION C: ORDER BY - Sorting Data
-- ==============================================================================

-- Query 11: Top 10 Highest Value Orders
SELECT OrderID, Product, Quantity, UnitPrice, TotalPrice
FROM Orders
ORDER BY TotalPrice DESC
LIMIT 10;

-- Query 12: 10 Most Recent Orders
SELECT OrderID, Date, Product, CustomerID, TotalPrice
FROM Orders
ORDER BY Date DESC
LIMIT 10;

-- Query 13: Multi-column Sort (Product A-Z, then Price High-Low)
SELECT OrderID, Product, UnitPrice, Quantity, TotalPrice
FROM Orders
ORDER BY Product ASC, TotalPrice DESC
LIMIT 15;


-- ==============================================================================
-- SECTION D: GROUP BY with AGGREGATIONS (COUNT, SUM, AVG)
-- ==============================================================================

-- Query 14: Total Number of Orders per Product (COUNT)
SELECT Product,
       COUNT(*) AS TotalOrders
FROM Orders
GROUP BY Product
ORDER BY TotalOrders DESC;

-- Query 15: Total Revenue per Product (SUM)
SELECT Product,
       SUM(TotalPrice) AS TotalRevenue,
       SUM(Quantity) AS TotalUnitsSold
FROM Orders
GROUP BY Product
ORDER BY TotalRevenue DESC;

-- Query 16: Average Order Value per Product (AVG)
SELECT Product,
       ROUND(AVG(TotalPrice), 2) AS AvgOrderValue,
       ROUND(AVG(UnitPrice), 2) AS AvgUnitPrice,
       ROUND(AVG(Quantity), 2) AS AvgQuantity
FROM Orders
GROUP BY Product
ORDER BY AvgOrderValue DESC;

-- Query 17: Order Count and Revenue by Payment Method
SELECT PaymentMethod,
       COUNT(*) AS OrderCount,
       ROUND(SUM(TotalPrice), 2) AS TotalRevenue,
       ROUND(AVG(TotalPrice), 2) AS AvgOrderValue
FROM Orders
GROUP BY PaymentMethod
ORDER BY TotalRevenue DESC;

-- Query 18: Order Distribution by Status (with Percentage)
SELECT OrderStatus,
       COUNT(*) AS OrderCount,
       ROUND(SUM(TotalPrice), 2) AS TotalValue,
       ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM Orders), 2) AS PercentageOfTotal
FROM Orders
GROUP BY OrderStatus
ORDER BY OrderCount DESC;

-- Query 19: Monthly Revenue Analysis (2024)
SELECT SUBSTR(Date, 1, 7) AS Month,
       COUNT(*) AS OrderCount,
       ROUND(SUM(TotalPrice), 2) AS MonthlyRevenue,
       ROUND(AVG(TotalPrice), 2) AS AvgOrderValue
FROM Orders
WHERE Date BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY SUBSTR(Date, 1, 7)
ORDER BY Month;

-- Query 20: Revenue by Referral Source (Marketing Channel Analysis)
SELECT ReferralSource,
       COUNT(*) AS OrderCount,
       ROUND(SUM(TotalPrice), 2) AS TotalRevenue,
       ROUND(AVG(TotalPrice), 2) AS AvgOrderValue,
       ROUND(100.0 * SUM(TotalPrice) / (SELECT SUM(TotalPrice) FROM Orders), 2) AS RevenueSharePct
FROM Orders
GROUP BY ReferralSource
ORDER BY TotalRevenue DESC;


-- ==============================================================================
-- SECTION E: HAVING CLAUSE - Filtering Grouped Data
-- ==============================================================================

-- Query 21: Products with Average Order Value Over $800 (HAVING)
SELECT Product,
       COUNT(*) AS OrderCount,
       ROUND(AVG(TotalPrice), 2) AS AvgOrderValue
FROM Orders
GROUP BY Product
HAVING AVG(TotalPrice) > 800
ORDER BY AvgOrderValue DESC;

-- Query 22: Repeat Customers with More Than 3 Orders (HAVING)
SELECT CustomerID,
       COUNT(*) AS OrderCount,
       ROUND(SUM(TotalPrice), 2) AS TotalSpent,
       ROUND(AVG(TotalPrice), 2) AS AvgOrderValue
FROM Orders
GROUP BY CustomerID
HAVING COUNT(*) > 3
ORDER BY TotalSpent DESC
LIMIT 15;

-- Query 23: High-Revenue Payment Methods (HAVING with SUM)
SELECT PaymentMethod,
       COUNT(*) AS OrderCount,
       ROUND(SUM(TotalPrice), 2) AS TotalRevenue
FROM Orders
GROUP BY PaymentMethod
HAVING SUM(TotalPrice) > 200000
ORDER BY TotalRevenue DESC;


-- ==============================================================================
-- SECTION F: ADVANCED QUERIES - Combined Techniques
-- ==============================================================================

-- Query 24: Coupon Code Effectiveness Analysis
SELECT COALESCE(CouponCode, 'No Coupon') AS Coupon,
       COUNT(*) AS OrderCount,
       ROUND(SUM(TotalPrice), 2) AS TotalRevenue,
       ROUND(AVG(TotalPrice), 2) AS AvgOrderValue
FROM Orders
GROUP BY CouponCode
ORDER BY TotalRevenue DESC;

-- Query 25: Year-over-Year Revenue Comparison
SELECT SUBSTR(Date, 1, 4) AS Year,
       COUNT(*) AS TotalOrders,
       ROUND(SUM(TotalPrice), 2) AS TotalRevenue,
       ROUND(AVG(TotalPrice), 2) AS AvgOrderValue,
       SUM(Quantity) AS TotalUnitsSold
FROM Orders
GROUP BY SUBSTR(Date, 1, 4)
ORDER BY Year;

-- Query 26: Product Performance by Order Status
SELECT Product,
       OrderStatus,
       COUNT(*) AS OrderCount,
       ROUND(SUM(TotalPrice), 2) AS TotalValue
FROM Orders
GROUP BY Product, OrderStatus
ORDER BY Product, OrderCount DESC;

-- Query 27: Top 10 Highest Spending Customers
SELECT CustomerID,
       COUNT(*) AS OrderCount,
       ROUND(SUM(TotalPrice), 2) AS TotalSpent,
       ROUND(AVG(TotalPrice), 2) AS AvgOrderValue,
       MAX(Date) AS LastOrderDate
FROM Orders
GROUP BY CustomerID
ORDER BY TotalSpent DESC
LIMIT 10;

-- Query 28: Cancellation Rate by Product (CASE WHEN)
SELECT Product,
       COUNT(*) AS TotalOrders,
       SUM(CASE WHEN OrderStatus = 'Cancelled' THEN 1 ELSE 0 END) AS CancelledOrders,
       ROUND(100.0 * SUM(CASE WHEN OrderStatus = 'Cancelled' THEN 1 ELSE 0 END) / COUNT(*), 2) AS CancellationRate
FROM Orders
GROUP BY Product
ORDER BY CancellationRate DESC;


-- ==============================================================================
-- SUMMARY: Overall Business Metrics
-- ==============================================================================

SELECT 
       COUNT(*) AS TotalOrders,
       COUNT(DISTINCT CustomerID) AS UniqueCustomers,
       COUNT(DISTINCT Product) AS UniqueProducts,
       ROUND(SUM(TotalPrice), 2) AS GrandTotalRevenue,
       ROUND(AVG(TotalPrice), 2) AS OverallAvgOrderValue,
       MIN(Date) AS FirstOrderDate,
       MAX(Date) AS LastOrderDate
FROM Orders;
