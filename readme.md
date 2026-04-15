# 🚨 SpeakUp

> A modern, secure platform to report crimes and incidents — anonymously or with identity — empowering voices that deserve to be heard.

---

## 🌍 Overview

**SpeakUp** is a full-stack web application that allows users to report incidents, crimes, or issues safely and efficiently. The platform supports anonymous reporting, real-time status tracking, and a powerful admin dashboard for moderation and verification.

---

## ✨ Key Features

### 👤 User Features

* 📝 Report complaints (Emergency / Non-Emergency)
* 🕵️ Anonymous reporting (no login required)
* 📍 Add location, coordinates, and images
* 📊 Track complaint status (Pending, In Progress, Resolved, Dismissed)
* ✏️ Update or delete own complaints
* 🎨 Modern dashboard with animations and smooth UX

### 🛡️ Admin Features

* 📂 View all complaints across the platform
* 🔍 Inspect complaint details with media
* 🔄 Update complaint status
* ❌ Delete any complaint
* ⚡ Real-time moderation workflow
* 🧠 Optimistic concurrency handling (prevents conflicts)

### 🔐 Authentication

* 👥 Separate User & Admin authentication
* 🍪 Cookie-based secure sessions
* 🛡️ Protected routes (User & Admin)

---

## 🖼️ Screenshots

### 🌐 Landing Page

![Landing Page](./screenshots/landing.png)

### 👤 User Dashboard

![User Dashboard](./screenshots/user-dashboard.png)

### 🛡️ Admin Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)

---

## 🧰 Tech Stack

### Frontend

* ⚛️ React (TypeScript)
* 🎨 Tailwind CSS + Custom Design System
* 🎬 GSAP Animations
* 🧠 Zustand (State Management)
* 🔔 Sonner (Toast Notifications)

### Backend

* 🟢 Node.js + Express
* 🧠 Prisma ORM
* 🐘 PostgreSQL
* 🔐 JWT Authentication

---

## 📦 Project Structure

```
client/
 ├── components/
 ├── pages/
 ├── store/
 ├── lib/

server/
 ├── controllers/
 ├── routes/
 ├── middlewares/
 ├── prisma/
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/krishnasahu22032003/speakup.git
cd speakup
```

### 2. Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 3. Setup environment variables

Create `.env` file in server:

```
DATABASE_URL=
JWT_SECRET=
```

### 4. Run the app

```bash
# backend
npm run dev

# frontend
npm run dev
```

---

## 🔐 Security Features

* JWT-based authentication
* Role-based access control (USER / ADMIN)
* Protected routes
* Input validation using Zod
* Safe database queries via Prisma

---

## 🚀 Future Enhancements

* 📍 Live map integration (Google Maps)
* 🔔 Real-time notifications
* 📊 Analytics dashboard
* 📱 Mobile app version
* 🌐 Multi-language support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

---

## 📧 Contact

For any queries or collaboration:

📩 Email:Krishna.sahu.work@gmail.com

---

## ❤️ Made with Love By Krishna

Built with passion to create safer communities and give people a voice.

---

## ⭐ Show Your Support

If you like this project, please ⭐ the repository and share it!

---
