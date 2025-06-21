# 🛒 Products Dashboard

Dashboard do zarządzania produktami — umożliwia ich przeglądanie, masową edycję cen, eksport danych i więcej. Aplikacja wspiera uwierzytelnianie JWT, rolę administratora i operacje na wielu produktach jednocześnie.

Praktycznie wszystko w tym projekcie to vibe-coding. Nawet ten README.md jest wzięty żywcem z ChatGPT lol.

---

## 🚀 Funkcje

- ✅ Rejestracja i logowanie (admin dodaje użytkowników)
- ✅ Przegląd produktów w widoku kafelkowym lub listy
- ✅ Sortowanie po cenie (rosnąco/malejąco)
- ✅ Zaznaczanie wielu produktów (zaznacz wszystkie / odznacz wszystkie)
- ✅ Masowa zmiana cen produktów
- ✅ Eksport zaznaczonych produktów (CSV, XLSX, JSON)
- ✅ Autoryzacja oparta o JWT
- ✅ Backend API z Express + TypeScript + PostgreSQL

---

## 🧱 Stos technologiczny

- **Frontend:** React + TailwindCSS + TypeScript
- **Backend:** Node.js + Express + TypeScript + PostgreSQL (TypeORM)
- **Auth:** JWT z zabezpieczonym tokenem w localStorage
- **Eksport:** XLSX, CSV, JSON
- **Inne:** Axios, Dotenv, Cors, ts-node, bcrypt

---

## 🧑‍💻 Instalacja

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/twoj-login/products-dashboard.git
cd products-dashboard
```

### 2. Backend
```bash
cd server
cp .env.example .env     # Ustaw swoje zmienne
npm install
npm run dev
```

W pliku .env ustaw np.:
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

## 🔐 Uwierzytelnianie

- Rejestracja publiczna jest zablokowana.
- Konta użytkowników może tworzyć tylko administrator.
- JWT token zapisywany jest w localStorage i wysyłany w nagłówkach.

# 📝 Licencja
MIT © 2025