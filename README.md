# 🎓 Learning Management System - HustLMS

A modern, full-featured Learning Management System (LMS) built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. The platform supports both instructors and learners, providing tools for course creation, online learning, progress tracking, and revenue analytics.

---

## 👥 Target Users

The LMS is designed for **two main user groups**:

### 🧑‍🏫 Instructors
- Create and manage courses and lesson content (videos, documents, images)
- Monitor learner progress for each course
- Analyze revenue generated from course enrollments

### 👨‍🎓 Learners
- Register/login using email or social accounts (Google, Facebook via Clerk)
- Browse, search, and enroll in free or paid courses
- Watch video lectures, read documents (PDF, Word, images)
- Track learning progress and receive completion certificates
- Leave reviews and feedback after completing a course

---

## 🚀 Features

### ✅ Common Features
- 🔐 **Authentication** with Clerk (Email, Google/Facebook SSO)
- 🧩 **Role-based system** for Instructors and Learners
- 🌐 **Responsive UI** using Tailwind CSS and Ant Design, shadcn/ui
- ⚡ **Lazy loading** and **skeleton loaders** for enhanced UX

### 📚 Learner Features
- Course browsing and filtering by title, instructor, or category
- Detailed course info: description, chapters, duration, instructor bio, and ratings
- Online learning experience with videos, PDFs, Word docs, and images
- Real-time progress tracking (% completed)
- Secure checkout via **VNPay** (free courses can be enrolled instantly)
- Course rating and commenting system
- Auto-generated PDF certificate after course completion

### 🧑‍🏫 Instructor Features
- Course builder: Create/edit/delete courses with multiple chapters
- Upload videos and attach lesson materials
- View list of enrolled students per course
- Monitor each student's progress
- Revenue analytics: see earnings per course or by date
- Enrollment statistics and progress dashboards

---

## 🧱 Tech Stack

- **Frontend**: React 19, Next.js 15 (Turbopack), Tailwind CSS, Ant Design, shadcn/ui  
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL  
- **Authentication**: Clerk  
- **Payments**: VNPay  
- **Cloud Storage**: Cloudinary  
- **Validation**: Zod + React Hook Form  
- **State Management**: Zustand  
- **PDF Export**: React PDF  
- **Charts**: Recharts  
- **UI**: Radix UI, DaisyUI, Lucide Icons  
- **UX Enhancements**: Skeletons, Lazy loading, Toasts, Confetti  

---

## 📦 Getting Started

```
1. git clone https://github.com/tmtuan04/lms-project2-20242.git
2. cd learning-management-system

3. npm install
4. npx prisma generate
5. npm run dev (or pnpm dev)
```

### ✅ Environment variables

The project relies on several secrets and configuration values. Copy `.env.example` to `.env.local` and fill in the real values before running the app:

```bash
cp .env.example .env.local
# then open .env.local and paste your keys
```

### 🛠 Windows build issues

On Windows, Prisma sometimes leaves a temporary `query_engine-*.node.tmp` file
locked, which makes `npm run build` fail with an EPERM rename error. To reduce
this pain we added two safeguards:

* a helper script (`scripts/clean-prisma.js`) that tries to delete any stale
  engine files and even remove the entire `.prisma/client` folder.
* the `prebuild` script now falls back to `rimraf` if the Node script itself
  fails.

If you still encounter a permission error, try these additional steps:

```bash
# close any running Next.js/Node processes (e.g. stop `npm run dev`)
# close editors that might be holding a handle on the file
node ./scripts/clean-prisma.js
# or use rimraf directly:
npx rimraf node_modules/.prisma/client
npm run build
```

Restarting the machine or logging out often clears the lock as well.

Required variables:

| Name | Description |
|------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (client) |
| `CLERK_SECRET_KEY` | Clerk secret key (server) |
| `CLERK_WEBHOOK_SECRET` | Clerk webhook signing secret |
| `POSTGRES_URL` | PostgreSQL connection string |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Cloudinary upload credentials |
| `VNPAY_TMN_CODE`, `VNPAY_SECRET_KEY` | VNPay sandbox/production keys |

Missing any of these will cause runtime errors (500s) as the server attempts to use them. The code now validates required env vars at startup and gives a clear message if one is absent.
