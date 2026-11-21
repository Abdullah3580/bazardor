# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে দেখার একটি Price Tracking ওয়েবসাইট। পণ্যের আজকের দাম, দাম বাড়া-কমার হার, ক্যাটাগরি অনুযায়ী ফিল্টার এবং বাজারভিত্তিক দাম দেখা যায়।

**Live:** your-live-link | **Repo:** your-repo-link

## Technologies
Next.js (App Router) · React · Tailwind CSS · BetterAuth · MongoDB Atlas · react-hot-toast

## Features
1. দামের চলমান ticker এবং আজ দাম বাড়া/কমা পণ্যের সেকশন (বাংলা সংখ্যায়)
2. ক্যাটাগরি পেজ — skeleton loading, দাম অনুযায়ী sort ও empty state
3. প্রতিটি পণ্যের dynamic details পেজ (সর্বনিম্ন/সর্বোচ্চ/গড় দাম ও বাজারভিত্তিক দাম)
4. BetterAuth দিয়ে ইমেইল-পাসওয়ার্ড, Google ও GitHub login
5. Protected route — login ছাড়া product details ও profile দেখা যায় না
6. My Profile থেকে নাম আপডেট এবং সব জায়গায় toast notification
7. সম্পূর্ণ responsive ডিজাইন ও custom 404 পেজ

## Run locally
```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

## Environment variables
`.env.local` (লোকাল) এবং Vercel → Settings → Environment Variables-এ এগুলো দিন:

| Key | কী দেবেন |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `BETTER_AUTH_SECRET` | যেকোনো লম্বা random string |
| `BETTER_AUTH_URL` | লোকালে `http://localhost:3000`, deploy-এর পর লাইভ সাইটের URL |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google Cloud Console থেকে |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub → Developer settings → OAuth Apps থেকে |

Social login-এর callback URL: `<BETTER_AUTH_URL>/api/auth/callback/google` এবং `/api/auth/callback/github`।

## Deploy (Vercel)
1. GitHub-এ push করুন, Vercel-এ repo import করুন।
2. উপরের environment variable গুলো বসান, `BETTER_AUTH_URL`-এ Vercel-এর লাইভ URL দিন।
3. Deploy-এর পর `/product/<slug>` ও `/category/<slug>` রিলোড করে দেখুন।
