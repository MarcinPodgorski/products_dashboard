# 🛒 Products Dashboard

A dashboard for product management — allows browsing products, bulk price editing, data export, and more. The app supports JWT authentication, admin role, and multi-product operations.

Honestly, almost everything in this project is vibe-coding. Even this README.md is straight from ChatGPT lol.

---

## 🚀 Features

- ✅ Registration and login (admin creates users)
- ✅ Product browsing in grid or list view
- ✅ Sorting by price (ascending/descending)
- ✅ Multi-product selection (select all / deselect all)
- ✅ Bulk product price editing
- ✅ Export selected products (CSV, XLSX, JSON)
- ✅ JWT-based authentication
- ✅ Backend API with Express + TypeScript + PostgreSQL

---

## 🧱 Tech Stack

- **Frontend:** React + TailwindCSS + TypeScript
- **Backend:** Node.js + Express + TypeScript + PostgreSQL (TypeORM)
- **Auth:** JWT with secure token stored in localStorage
- **Export:** XLSX, CSV, JSON
- **Others:** Axios, Dotenv, Cors, ts-node, bcrypt

---

## 🧑‍💻 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/products-dashboard.git
cd products-dashboard

### 2. Backend
```bash
cd server
cp .env.example .env     # Set your variables
npm install
npm run dev
```

In your .env file, for example:
```bash
PORT=5001
JWT_SECRET=supersecret
DATABASE_URL=postgres://user:password@localhost:5432/dashboarddb
```

### 3. Frontend
```bash
cd client
npm install
npm run dev
```

## 🔐 Authentication

- For now, registration is not available.
- JWT is saved in localStorage and sent through headers.

# 📝 Licence
MIT © 2025 lmao

