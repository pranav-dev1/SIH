# CAPACITY CONNECT 🎓
### Digital Capacity Building and Learning Management Portal

A full-stack, responsive digital learning platform designed for accessible, structured, and measurable capacity building. Built as a high-impact MVP for Smart India Hackathon (SIH).

---

## 🌟 Key Features

- **Multi-Role Access Control**: Tailored portals for Trainees, Trainers, and System Administrators.
- **Interactive Landing Page**: Modern EdTech SaaS hero, feature cards, and 5-step "How It Works" workflow.
- **Course Catalog & Filtering**: Search and filter courses by topic domain and difficulty level.
- **Interactive Learning Player**: Module progress tracking, downloadable PDF resources, and video lesson player.
- **Online Assessment Engine**: 1-question-at-a-time quiz modal with automated scoring and question review explanations.
- **Verifiable Digital Certificates**: Automatically generated browser-printable certificates of completion with unique Certificate IDs.
- **Feedback & Rating System**: 5-star course and trainer quality feedback.
- **AI Learning Assistant & Recommendations**: Smart floating chat drawer for course Q&A and AI-based course recommendations.
- **Trainer & Admin Dashboards**: Course management, user controls, and interactive data visualization using Recharts.
- **Zero-Friction Auto-Seed**: Works out of the box with seeded demo accounts for immediate judging.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons, Recharts, Axios
- **Backend**: Node.js, Express.js, JWT Authentication, bcryptjs
- **Database**: MongoDB / Mongoose (with automated fallback in-memory datastore adapter)

---

## 🚀 Quick Setup & Installation

### 1. Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Database Configuration (MongoDB)
By default, the server connects to local MongoDB via `mongodb://localhost:27017/capacity_connect` (configured in `backend/.env`).

> **Note**: If MongoDB service is not running locally, the application automatically uses an in-memory seed datastore so that all features, login credentials, courses, assessments, certificates, and REST APIs work 100% reliably out of the box.

---

## 💻 Running the Application

### Option A: Start Backend Server
```bash
cd backend
npm start
```
*API Server runs on `http://localhost:5000`*

### Option B: Start Frontend Development Server
```bash
cd frontend
npm run dev
```
*Frontend runs on `http://localhost:3000`*

---

## 🔑 Demo Credentials

On the login page, you can use the **"Click to Auto-Fill"** buttons or manual entry:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Trainee** | `trainee@capacityconnect.demo` | `Demo@123` |
| **Trainer** | `trainer@capacityconnect.demo` | `Demo@123` |
| **Admin** | `admin@capacityconnect.demo` | `Demo@123` |

---

## 🧪 Complete Trainee Demonstration Flow

To demonstrate the full end-to-end user flow to judges:

1. **Login**: Go to `http://localhost:3000/login`, click **Trainee Quick Fill**, and log in.
2. **Dashboard**: View your Trainee Dashboard statistics, progress bars, and AI recommendations.
3. **Course Catalog**: Open **Browse Courses**, filter by *Disaster Management*, and open **Disaster Preparedness & Response**.
4. **Learning Player**: Click **Resume Course**, inspect module lessons, and click **Mark as Completed**.
5. **Take Assessment**: Click **Take Final Assessment Quiz**, complete the 5 questions, and submit.
6. **Certificate**: Upon passing (70%+), click **View Digital Certificate** to preview and test the **Print Certificate** button.
7. **Feedback**: Navigate to **Feedback**, submit a 5-star course review, and observe instant submission confirmation.
8. **Trainer & Admin Portals**: Logout and sign in as **Trainer** or **Admin** to present trainer course creation and platform-wide Recharts analytics!
