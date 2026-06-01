# DecodeLabs Project 2: Interactive Exploratory Data Analysis Dashboard

This repository contains the interactive Exploratory Data Analysis (EDA) web application developed for Project 2 of the DecodeLabs Data Analytics program. The application is built using React, Vite, and Recharts, and is designed to analyze and visualize an e-commerce transactional dataset containing 1,200 records spanning the period from January 2023 to June 2025.

## Key System Features

* **Overview Panel**: Provides high-level statistical summaries, descriptive metrics tables, and categorical distributions of order statuses.
* **Product Analytics**: Displays revenue breakdowns by product type, payment channel distributions, and marketing referral sources.
* **Temporal Trend Analysis**: Includes interactive monthly revenue timelines and order volume visualizations with click-to-inspect analytical detail.
* **Risk and Outlier Assessment**: Visualizes cancellation and return frequencies, displays Interquartile Range (IQR) calculations, and provides sortable tables of identified outliers.
* **Business Insights Repository**: Features a searchable and filterable database of key operational findings classified by priority level.

## Interactive Capabilities

* **Temporal Filters**: Dynamically filters all metrics and visualizations by selected calendar years (2023, 2024, 2025, or all periods).
* **Interactive Data Tables**: Allows dynamic column sorting for numerical and categorical attributes in data tables.
* **Search Functions**: Provides real-time filtering of product records and business recommendations based on user input.
* **Data Point Selection**: Enables users to select specific points on the time series visualizations to reveal granular daily and monthly metrics.

## Technical Architecture

* **Frontend Framework**: React 19 and JavaScript (JSX)
* **Build System and Development Server**: Vite 8
* **Visualization Library**: Recharts 2
* **Component Styling**: Vanilla CSS utilizing CSS custom properties for theme styling and responsive layout constraints

## Getting Started

### Prerequisites

* Node.js version 22.12 or higher installed on the system path.

### Deployment Instructions

To run the application locally:

```bash
# Clone the repository
git clone https://github.com/kudzaishezinyemba-byte/Task--2--Kudzaishe-Zinyemba.git
cd Task--2--Kudzaishe-Zinyemba

# Install dependencies
npm install

# Run the development server
npm run dev
```

The local server will instantiate the application at `http://localhost:5173`.

## Author Information

**Kudzaishe Zinyemba**  
*Data Analytics Associate, DecodeLabs 2026*
