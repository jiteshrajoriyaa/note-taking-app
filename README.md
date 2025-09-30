# Auth Frontend (React + Vite + Tailwind)

This project is a **frontend for authentication** that allows users to **sign up with email + OTP** or through **Google OAuth**.  
It is built with:

- [React](https://react.dev/) (Vite + TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- Responsive **blue theme UI**
- Proper **error handling and validation**

---

## 🚀 Features

- 📧 **Email + OTP signup flow**  
- 🔑 **Google OAuth signup** (via backend redirect)  
- ⚡ **Axios API integration**  
- 🎨 **Blue themed, responsive design** with Tailwind  
- ❌ **Error messages shown** for invalid inputs  

---

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/jiteshrajoriyaa/note-taking-app.git
cd note-taking-app/backend


```
### 2. Setup ENV
```
PORT=3000

MONGO_URL=YOUR_MONGO_URL

JWT_STRING=YOUR_SECRET

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_PASS=YOUR_APP_PASS
SMTP_USER=YOUR_EMAIL

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

FRONTEND_URL=http://localhost:5173
```

### 3. Start the Project
```
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

#END