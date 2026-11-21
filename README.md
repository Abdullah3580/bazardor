<div align="center">

# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে**

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, দাম বাড়া-কমার হার এবং বাজারভিত্তিক দাম দেখার একটি Price Tracking ওয়েবসাইট।

[🌐 Live Site] https://bazardor-ten-lime.vercel.app/ · [💻 GitHub Repository](https://github.com/Abdullah3580/bazardor)

</div>

---

## 📖 প্রজেক্ট পরিচিতি

**বাজার দর** একটি Next.js ভিত্তিক ওয়েব অ্যাপ্লিকেশন, যেখানে চাল, ডাল, তেল, সবজি, মাছ-মাংসসহ বিভিন্ন নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম দেখা যায়। কোন পণ্যের দাম বেড়েছে আর কোনটার কমেছে তা হোম পেজেই বোঝা যায়। ক্যাটাগরি অনুযায়ী পণ্য ফিল্টার ও দাম অনুযায়ী সাজানো যায়। লগইন করলে প্রতিটি পণ্যের বিস্তারিত পেজে সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং বিভিন্ন বাজারের আলাদা দাম দেখা যায়।

## ✨ প্রধান ফিচার

1. **লাইভ প্রাইস ticker ও বাংলা সংখ্যা** — নেভবারের নিচে পণ্যের নাম, দাম ও ▲/▼ পরিবর্তনের হার অবিরাম ঘুরতে থাকে। সব দাম বাংলা অঙ্কে দেখানো হয়।
2. **আজ দাম বেড়েছে / কমেছে সেকশন** — সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য আলাদাভাবে দেখায়, সাথে সব পণ্যের তালিকা।
3. **ক্যাটাগরি পেজ ও Sorting** — ক্যাটাগরি অনুযায়ী ফিল্টার, loading skeleton এবং `ডিফল্ট / দাম: কম থেকে বেশি / দাম: বেশি থেকে কম` সাজানো (বাংলা সংখ্যা নয়, সংখ্যার মান ধরে)।
4. **Dynamic Product Details (Protected Route)** — `/product/[slug]` পেজে সর্বনিম্ন, সর্বোচ্চ, গড় ও আজ/গতকাল/গত সপ্তাহ/গত মাসের দাম এবং বিভাগভিত্তিক বাজারের দাম। লগইন ছাড়া ঢুকলে সাইন ইন পেজে পাঠিয়ে সতর্কবার্তা দেখায়।
5. **BetterAuth Authentication** — ইমেইল-পাসওয়ার্ড দিয়ে সাইন আপ/সাইন ইন এবং Google ও GitHub সোশ্যাল লগইন, প্রতিটি ধাপে toast notification।
6. **My Profile ও তথ্য আপডেট** — প্রোফাইলে নাম-ইমেইল দেখা এবং নাম আপডেট করা।
7. **Fully Responsive ও 404 পেজ** — মোবাইল, ট্যাবলেট ও ডেস্কটপে সঠিকভাবে চলে। ভুল ক্যাটাগরি বা পণ্যের ঠিকানায় "হোম পেজে ফিরে যান" বাটনসহ ৪০৪ পেজ দেখায়।

## 🛠️ ব্যবহৃত প্রযুক্তি

| প্রযুক্তি | ব্যবহার |
| --- | --- |
| [Next.js 15](https://nextjs.org) (App Router) | UI ও রাউটিং, dynamic route |
| [React 19](https://react.dev) | কম্পোনেন্ট ও state |
| [Tailwind CSS 4](https://tailwindcss.com) | স্টাইলিং ও responsive ডিজাইন |
| [BetterAuth](https://better-auth.com) | ইমেইল ও সোশ্যাল লগইন, সেশন |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | ইউজার ও সেশন ডেটা |
| [react-hot-toast](https://react-hot-toast.com) | Toast notification |
| Next.js Middleware | Protected route |

## 🔌 API

পণ্য ও ক্যাটাগরির ডেটা Programming Hero-র BazarDor API থেকে আসে:

```
GET /api/bazardor/categories
GET /api/bazardor/categories/:slug
GET /api/bazardor/products
GET /api/bazardor/products?category=:slug
GET /api/bazardor/products/:id
```

Main API সাড়া না দিলে অ্যাপ স্বয়ংক্রিয়ভাবে বিকল্প দুটি সার্ভার চেষ্টা করে।

## 🗺️ পেজ ও রুট

| রুট | বিবরণ | সুরক্ষিত |
| --- | --- | :---: |
| `/` | হোম পেজ | ❌ |
| `/category/[slug]` | ক্যাটাগরি অনুযায়ী পণ্য | ❌ |
| `/product/[slug]` | পণ্যের বিস্তারিত | ✅ |
| `/signin`, `/signup` | লগইন ও রেজিস্ট্রেশন | ❌ |
| `/profile` | আমার প্রোফাইল | ✅ |
| `/profile/update` | নাম আপডেট | ✅ |

## 🚀 লোকালে চালানোর নিয়ম

```bash
git clone https://github.com/Abdullah3580/bazardor.git
cd bazardor
npm install
cp .env.example .env.local   # Windows-এ ফাইলটি কপি করে নাম দিন .env.local
npm run dev
```

এরপর http://localhost:3000 খুলুন।

### Environment Variables

`.env.local` ফাইলে প্রতিটি মান আলাদা লাইনে দিন:

| Key | বিবরণ |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `BETTER_AUTH_SECRET` | লম্বা random string (৩২ অক্ষরের বেশি) |
| `BETTER_AUTH_URL` | লোকালে `http://localhost:3000`, ডেপ্লয়ে লাইভ সাইটের URL |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth (ঐচ্ছিক) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth (ঐচ্ছিক) |

সোশ্যাল লগইনের callback URL:
- `<BETTER_AUTH_URL>/api/auth/callback/google`
- `<BETTER_AUTH_URL>/api/auth/callback/github`

### প্রোডাকশন বিল্ড

```bash
npm run build
npm start
```

## 📁 ফোল্ডার কাঠামো

```
├── app/
│   ├── page.js                 # হোম পেজ
│   ├── category/[slug]/        # ক্যাটাগরি পেজ
│   ├── product/[slug]/         # পণ্যের বিস্তারিত (protected)
│   ├── profile/                # প্রোফাইল ও আপডেট (protected)
│   ├── signin/  signup/        # অথেনটিকেশন
│   └── api/auth/[...all]/      # BetterAuth route
├── components/                 # Navbar, Ticker, PriceCard, Footer
├── lib/                        # API hook, auth, ফরম্যাট helper
└── middleware.js               # Protected route
```

## ☁️ ডেপ্লয়

1. কোড GitHub-এ push করুন।
2. Vercel (বা Render/Netlify)-এ repository import করুন।
3. উপরের environment variable গুলো বসান; `BETTER_AUTH_URL`-এ লাইভ সাইটের URL দিন।
4. Deploy করে `/product/<slug>` ও `/category/<slug>` রিলোড করে দেখুন।

---

<div align="center">

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।

</div>