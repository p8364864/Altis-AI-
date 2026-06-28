========================================================================
                     ALTIS AI - DASHBOARD METRICS SYSTEM
                      Documentation & Setup Guide
========================================================================
Created: May 2026
Purpose: An absolute blueprint explaining exactly how the frontend (React + Tailwind) 
         interacts with the financial backend pipeline to render real-time MongoDB 
         telemetry metrics.

------------------------------------------------------------------------
1. TERMINAL COMMANDS (Step-by-Step Setup)
------------------------------------------------------------------------

### FRONTEND DEPLOYMENT
Navigate to your frontend project folder in your terminal and run these commands:

1. Install core UI rendering & icon pack utilities:
   $ npm install lucide-react

2. Install HTTP network delivery package:
   $ npm install axios

3. Start your frontend Vite development workspace:
   $ npm run dev


------------------------------------------------------------------------
2. THE SECRET CONFIGURATION (.env File)
------------------------------------------------------------------------
Create a file named exactly `.env` in the root of your FRONTEND folder.
It securely maps the environment routing keys so they are not hardcoded publicly.

VITE_API_BASE_URL=http://localhost:8000/api
VITE_ENABLE_AI_TELEMETRY=true


------------------------------------------------------------------------
3. UNDERSTANDING THE EXPORTS & IMPORTS (Who does what?)
------------------------------------------------------------------------

### IMPORTED MODULES & COMPONENTS (Dashboard.jsx)
* Sidebar (from '../Components/Sidebar')
  -> Work: The navigation docking bay. Houses core controls to swap panels and log entries.
* DashboardNavbar (from '../Components/DashboardNavbar')
  -> Work: The premium top header workspace panel. Manages contextual search bars and profiles.
* lucide-react Pack (ArrowUpRight, DollarSign, Wallet, etc.)
  -> Work: Visual data indicators. Renders high-fidelity icons for every dynamic card panel.
* backimage (from '../assets/...png')
  -> Work: Backdrop interface canvas. Displays the deep slate glass-morphism matrix background.

### LOCAL LIFECYCLE HOOKS & STATES
* useState()
  -> Work: Instantiates independent analytics arrays (revenueData, expenseData, profitData) at flat 0 values.
* useEffect()
  -> Work: Triggers a single fast-channel database check immediate upon browser window load.
* Promise.all()
  -> Work: Fires 5 simultaneous network requests without locking up the user interface.


------------------------------------------------------------------------
4. DATABASE MODEL MODIFICATION
------------------------------------------------------------------------
To populate this dashboard dynamically from your database pipelines without errors, ensure your models follow these Mongoose rules:

1. Invoices (Revenue & Receivables):
   Must store numerical values (`value: { type: Number }`) and track customer identities along with an overdue date configuration.

2. Bills (Expenses & Payables):
   Must record outward liability integers (`value: { type: Number }`) alongside vendor parameters and custom workflow status indicators.


------------------------------------------------------------------------
5. API WORKFLOWS & LOGICAL TRAFFIC (How data travels)
------------------------------------------------------------------------

### A. LIVE DASHBOARD ANALYTICS REFRESH
1. The user launches or reloads the main dashboard view.
2. React hooks fire a parallel non-blocking transmission bundle via Axios down to the API gateway router.
3. The server catches requests and targets the following MongoDB metric paths:
   - `/api/analytics/total-revenue` -> Summarizes aggregate corporate incomes.
   - `/api/analytics/total-expenses` -> Aggregates outward resource spend.
   - `/api/analytics/net-profit` -> Subtracts total expenses directly from revenue.
   - `/api/analytics/accounts-receivable` -> Isolates uncollected customer invoice logs.
   - `/api/analytics/accounts-payable` -> Monitors unpaid incoming vendor balance cycles.
4. Raw database outcomes return as a unified JSON success package back to the UI state variables.

### B. THE "CLEAN SLATE" FALLBACK SWITCH (Empty Database Rule)
1. If the logged array size equals zero (meaning your database is completely empty or newly setup):
2. The code bypasses empty/broken loops entirely.
3. The dashboard drops all numeric strings down to formatted regional baselines (`₹0`).
4. Instead of showing an empty grid layout or crash screen, the conditional logic checks array lengths and replaces the main area with a stylized fallback block: **"No ledger sheets found"**.
5. The UI shows an explanatory micro-instruction text instructing the user to create their very first entry via the sidebar.

========================================================================