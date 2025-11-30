# Agri-Shield 🌱

Agri-Shield is a web platform designed to assist farmers with real-time weather updates, crop tracking, achievements, and notification features. It integrates a modern Next.js frontend, Node.js/Express backend, MongoDB, and Firebase Authentication to deliver a smooth and reliable experience.

---

## 🌐 Live Demo

- **Frontend:** https://agri-shield-xi.vercel.app/  
- **Backend API:** https://agri-shield-w53f.onrender.com/

---

## 📂 GitHub Repository

https://github.com/Disa44ay/Agri-shield.git

---

## 🛠 Technology Stack

### **Frontend**
- Next.js, React  
- Tailwind CSS, DaisyUI  
- Lottie animations  
- EmailJS for notifications  
- Language toggle (EN/Bn)

### **Backend**
- Node.js, Express  
- MongoDB Atlas, Mongoose  
- Firebase Authentication  
- Middleware: body-parser, dotenv, validator, bcrypt  
- Deployment: Render

---

## 📝 Features

### **General**
- Secure Firebase-based authentication  
- Dedicated farmer dashboard  
- Real-time weather updates  
- Crop registration & batch tracking  
- Achievement logging  
- Notification system (toast + EmailJS)  
- Fully responsive UI (mobile/tablet/desktop)  
- English/Bangla UI toggle  

### **Backend Core Functions**
- User management  
- Crop management  
- Achievement management  
- Firebase token verification  
- Standardized responses

---

## 🔌 Backend API Keys

Main API groups:

- **/api/users**  
- **/api/achievements**  
- **/api/crops**

These cover all user, crop, and achievement operations in the system.

---

## 🔐 Authentication

- All identities verified using **Firebase Authentication**  
- Backend validates **JWT tokens** for protected actions  
- Responses use a unified structure:

```json
{
  "status": "success" | "fail",
  "message": "Description of result",
  "data": { }
}
