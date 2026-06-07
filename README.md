# Avnish Kumar — Portfolio

A premium personal portfolio website with a separate frontend (static) and backend (Node.js API).

## 📁 Structure

```
portfolio/
├── frontend/       # Static HTML/CSS/JS site → Deploy to Vercel
│   ├── index.html
│   ├── main.js
│   ├── css/style.css
│   ├── images/
│   └── vercel.json
└── backend/        # Express API server → Deploy to Render
    ├── server.js
    ├── package.json
    ├── render.yaml
    └── .env.example
```

## 🚀 Local Development

**Backend (port 5000):**
```bash
cd backend
cp .env.example .env   # add your RESEND_API_KEY
npm install
npm run dev
```

**Frontend (port 8080):**
```bash
cd frontend
npx http-server -p 8080
```

## 🌐 Deployment

### Backend → Render (free)
1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo, set **Root Directory** to `backend`
4. Add environment variable: `RESEND_API_KEY=your_key`
5. Deploy — copy the live URL (e.g. `https://avnish-portfolio-backend.onrender.com`)

### Frontend → Vercel (free)
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo, set **Root Directory** to `frontend`
3. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com` (optional)
4. In `frontend/main.js`, update `CONFIG.API_URL` with your Render backend URL
5. Deploy — your site goes live instantly

## 🔑 Environment Variables

| Variable | Where | Description |
|---|---|---|
| `RESEND_API_KEY` | Backend (Render) | API key from [resend.com](https://resend.com) |

## 📬 Contact
- **Email:** avnishchauhan7088@gmail.com
- **GitHub:** [Avnish-kumar-01](https://github.com/Avnish-kumar-01)
