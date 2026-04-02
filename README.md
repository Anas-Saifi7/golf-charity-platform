# 🏌️ GreenHeart — Golf Charity Subscription Platform

A full-stack subscription-based web application combining **golf performance tracking**, **charity fundraising**, and a **monthly draw-based reward engine**. Built as part of the Digital Heroes Full-Stack Development Trainee Selection Process.

---

## 🚀 Live Demo

| Service | URL |
|--------|-----|
| 🌐 Frontend | [golf-charity-platform-dkov-two.vercel.app](https://golf-charity-platform-dkov-two.vercel.app) |
| ⚙️ Backend API | [golf-charity-platform-q0g0.onrender.com](https://golf-charity-platform-q0g0.onrender.com) |

---

## 📌 Features

### 👤 User
- Signup / Login with JWT authentication
- Monthly & Yearly subscription via **Stripe**
- Enter golf scores in **Stableford format** (rolling 5-score system)
- Select a charity & set donation percentage
- View draw participation and winnings
- Upload winner proof for verification

### 🛡️ Admin
- Manage users, subscriptions, and scores
- Configure & run monthly draws (random / algorithmic)
- Manage charity listings
- Verify winner submissions & mark payouts
- View reports & analytics

---

## 🛠️ Tech Stack

### Frontend
| Tech | Usage |
|------|-------|
| React + Vite | UI Framework |
| Tailwind CSS | Styling |
| Axios | API calls |
| React Router | Client-side routing |

### Backend
| Tech | Usage |
|------|-------|
| Node.js + Express | Server & REST API |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Stripe | Payment Gateway |
| dotenv | Environment config |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 📁 Project Structure

```
Golf Charity Subscription Platform/
├── frontend/                  # React + Vite app
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route-level pages
│   │   
│   │   └── utils/             # Axios config, helpers
│   ├── vercel.json            # Vercel routing fix
│   └── package.json
│
└── backend/                   # Node.js + Express API
    ├── config/
    │   └── db.js              # MongoDB connection
    ├── controllers/           # Business logic
    ├── middleware/
    │   └── authMiddleware.js  # JWT verification
    ├── models/                # Mongoose schemas
    ├── routes/                # API route definitions
    └── server.js              # Entry point
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Stripe account

### 1. Clone the repo
```bash
git clone https://github.com/Anas-Saifi7/golf-charity-platform.git
cd golf-charity-platform
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create `.env` file in `/backend`:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
CLIENT_URL=http://localhost:5173
```

Start backend:
```bash
node server.js
```

### 3. Frontend setup
```bash
cd frontend
npm install
```

Create `.env` file in `/frontend`:
```env
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

---

## 🌐 Deployment Guide

### Frontend → Vercel
1. Push code to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-render-url.onrender.com`
5. Deploy ✅

> **Important:** Add `vercel.json` in frontend folder for React Router to work:
> ```json
> { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
> ```

### Backend → Render
1. Create new **Web Service** on [render.com](https://render.com)
2. Connect GitHub repo, set **Root Directory** to `backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add all environment variables in **Environment** tab
6. Deploy ✅

### MongoDB Atlas
1. Create cluster on [mongodb.com/atlas](https://mongodb.com/atlas)
2. Add `0.0.0.0/0` in **Network Access** (for Render dynamic IPs)
3. Copy connection string to `MONGO_URI`

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Subscription
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/subscription/create-checkout` | Create Stripe checkout session |
| POST | `/api/subscription/activate` | Activate subscription after payment |

### Scores
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/scores/add` | Add new score |
| GET | `/api/scores/:userId` | Get user scores |

### Draw
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/draw/run` | Run monthly draw |
| GET | `/api/draw/results` | Get draw results |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| PUT | `/api/admin/verify/:id` | Verify winner |

---

## 🧪 Test Credentials

| Role | Email | Password |
|------|-------|----------|
| User | test@example.com | 123456 |
| Admin | admin@example.com | admin123 |

> Use Stripe test card: `4242 4242 4242 4242` · Any future date · Any CVV

---

## 👨‍💻 Developer

**Anas Khan**
- 🎓 B.Tech CSE (AI & ML) — KCC Institute of Technology, AKTU
- 💼 GitHub: [github.com/Anas-Saifi7](https://github.com/Anas-Saifi7)
- 🔗 LinkedIn: [linkedin.com/in/anaskhan7668014201](https://linkedin.com/in/anaskhan7668014201)

---

## 📄 License

This project was built as part of the **Digital Heroes Full-Stack Trainee Selection Process**.  
PRD issued by [digitalheroes.co.in](https://digitalheroes.co.in)
