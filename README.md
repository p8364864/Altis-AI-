# Altis-AI-
# 💼 Altis AI — Financial Management Platform

> An AI-powered MERN stack platform that automates financial tracking, GST compliance, and invoice scanning with an intelligent data assistant.

---

## 🚀 Live Demo
> Coming Soon

---

## 📌 About The Project

**Altis AI** is a full-stack financial ERP platform designed for businesses to manage their invoices, expenses, inventory, and GST compliance — all in one place. It features an AI-powered OCR bill scanner that auto-extracts invoice data and an intelligent financial chatbot that answers natural language queries and predicts financial trends from live database context.

---

## ✨ Features

### 🔐 Authentication
- Secure login & logout with **JWT**
- **Google OAuth** for one-click sign-in

### 📊 Dashboard
- Real-time **KPI cards** — Revenue, Profit, Expenses
- **GST Summary** with automated IGST & CGST breakdowns
- Ready-for-government filing tax overview

### 📁 Financial Modules
- 🧾 **Invoice Management** — Upload & track invoices
- 💸 **Expense Management** — Log and monitor expenses
- 📦 **Inventory Management** — Track stock levels

### 📈 Reports
- Interactive **Monthly & Yearly** financial reports
- Dynamic **graphs and charts** for data-driven decisions

### 🤖 AI Features
- **OCR Bill Scanner** — Auto-extracts invoice data (vendor, amount, GST, reference) from uploaded bill images directly into the database
- **AI Financial Assistant** — Chat with your financial data in plain English, get calculations, summaries, and future predictions powered by DeepSeek-V4-Pro

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Axios |
| Backend | Node.js, Express.js, REST API |
| Database | MongoDB |
| Authentication | Google OAuth, JWT |
| AI & Python | Python, Flask, Flask-CORS |
| OCR | Pytesseract, Pillow |
| LLM | HuggingFace Inference API, DeepSeek-V4-Pro |
| Environment | dotenv |

---

## 📂 Project Structure

```
altis-ai-financial-platform/
│
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│
├── server/                  # Node.js + Express Backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── index.js
│
├── ai-service/              # Python Flask AI Layer
│   ├── uploads/
│   ├── app.py
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/altis-ai-financial-platform.git
cd altis-ai-financial-platform
```

### 2. Setup Backend (Node.js)
```bash
cd server
npm install
```
Create a `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
```bash
npm start
```

### 3. Setup Frontend (React)
```bash
cd client
npm install
npm start
```

### 4. Setup AI Service (Python)
```bash
cd ai-service
pip install -r requirements.txt
```
Create a `.env` file:
```env
HF_TOKEN=your_huggingface_token
```
```bash
python app.py
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/google` | Google OAuth |
| GET | `/api/invoices` | Get all invoices |
| POST | `/api/invoices` | Add invoice |
| GET | `/api/expenses` | Get all expenses |
| POST | `/api/expenses` | Add expense |
| GET | `/api/inventory` | Get inventory |
| POST | `/upload` | OCR bill scan (Python) |
| POST | `/chat` | AI chatbot (Python) |

---



---

> ⭐ If you found this project helpful, please give it a star!
