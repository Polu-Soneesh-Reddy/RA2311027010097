# 📢 Campus Notification System

A full-stack notification system built with React and Node.js that displays prioritized campus notifications with filtering, pagination, and centralized logging.

---

## 🚀 Features

- 🔥 **Top Priority Notifications**
  - Ranked using custom priority logic:
    - Placement > Result > Event
    - Latest notifications first

- 📋 **All Notifications View**
  - Displays all fetched notifications
  - Read / Unread state handling

- 🎯 **Filtering**
  - Filter by notification type:
    - Event
    - Result
    - Placement

- 📄 **Pagination**
  - Navigate through pages of notifications

- ✅ **Mark as Read / Mark All Read**

- 🌙 **Dark Mode Support**

- 📊 **Unread Notification Counter**

- 🧠 **Logging Middleware**
  - Logs:
    - API calls
    - User actions
    - State updates
    - Errors

---

## 🏗️ Architecture


React Frontend → Node.js Backend (Proxy) → External API


- **Frontend (React)**
  - UI rendering
  - State management
  - User interactions

- **Backend (Node.js)**
  - Acts as proxy to avoid CORS issues
  - Forwards API requests securely

- **Logging Middleware**
  - Centralized logging system used across the app

---

## 🛠️ Tech Stack

- React.js
- Material UI
- Node.js (Express)
- Axios

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_ROLL_NUMBER.git
cd YOUR_ROLL_NUMBER
2️⃣ Start Backend
cd backend
npm install
node server.js

Backend runs on:

http://localhost:5000
3️⃣ Start Frontend
cd notification_app_fe
npm install
npm start

Frontend runs on:

http://localhost:3000
🔐 Credentials

Replace the following placeholders in the code before running:

YOUR_EMAIL
YOUR_CLIENT_ID
YOUR_CLIENT_SECRET
YOUR_ACCESS_CODE
📸 Screenshots

Screenshots demonstrating:

UI layout
Top notifications
Filtering
Pagination
Network/API calls
Logging

Available in the screenshots/ folder.

📂 Project Structure
YOUR_ROLL_NUMBER/
├── notification_app_fe/
├── backend/
├── screenshots/
├── notification_system_design.md
└── README.md
🧠 Key Highlights
Clean modular architecture
Reusable logging middleware
Priority-based sorting logic
Responsive and user-friendly UI
Proper error handling and state management
⚠️ Notes
node_modules are excluded
Sensitive credentials are not included
Backend proxy is required to handle CORS
👨‍💻 Author

Your Name
Roll Number: YOUR_ROLL_NUMBER
