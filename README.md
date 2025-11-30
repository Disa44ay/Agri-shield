Agri-Shield 🌱

Agri-Shield is a web platform designed to assist farmers with real-time weather updates, crop tracking, achievements, and notification features. It integrates a modern Next.js frontend, Node.js/Express backend, MongoDB, and Firebase Authentication to deliver a smooth and reliable experience.

🌐 Live Demo

Frontend: https://agri-shield-xi.vercel.app/

Backend API: https://agri-shield-w53f.onrender.com/

📂 GitHub Repository

https://github.com/Disa44ay/Agri-shield.git

🛠 Technology Stack
Frontend

Next.js, React

Tailwind CSS, DaisyUI

Lottie animations

EmailJS for notifications

Language toggle (EN/Bn)

Backend

Node.js, Express

MongoDB Atlas, Mongoose

Firebase Authentication

Middleware: body-parser, dotenv, validator, bcrypt

Deployment: Render

📝 Features
General

Firebase-based secure authentication

Full farmer dashboard

Real-time weather data

Crop registration & batch tracking

Achievement logging system

Notification system (toast + EmailJS)

Responsive UI (mobile/tablet/desktop)

English/Bangla UI switch

Backend Core Functions

User management (CRUD)

Crop management (CRUD)

Achievement management

Firebase token verification

Consistent response handling (status/message/data)

🧩 Database Schemas
User
{
  _id: ObjectId,
  email: String,
  name: String,
  phone: String,
  division: String,
  district: String,
  homeAddress: String,
  picture: String,
  createdAt: Date,
  updatedAt: Date
}

Achievement
{
  _id: ObjectId,
  userEmail: String,
  achievements: [String],
  awardedAt: Date,
  createdAt: Date,
  updatedAt: Date
}

Crop
{
  _id: ObjectId,
  userEmail: String,
  cropName: String,
  cropType: [String],
  batchId: String,
  estimatedWeightKg: Number,
  harvestDate: Date,
  storage: {
    district: String,
    storageName: String,
    storageDate: Date
  },
  status: String,   // pending | completed
  createdAt: Date,
  updatedAt: Date
}

🔌 Backend API Overview
Base URLs

Users: /api/users

Achievements: /api/achievements

Crops: /api/crops

User APIs
Method	Endpoint	Description
POST	/register	Register or fetch existing user
GET	/	Get all users
GET	/:email	Get user by email
PATCH	/:email	Update user fields
DELETE	/:email	Delete user
Achievement APIs
Method	Endpoint	Description
POST	/	Create achievement entry
GET	/:email	Get achievements by user
Crop APIs
Method	Endpoint	Description
POST	/	Create new crop entry
GET	/:email	Get crops by user
PATCH	/:email/:batchId	Update crop by batch
DELETE	/:email/:batchId	Delete crop entry
🔐 Authentication

All user identities validated through Firebase Authentication

Backend verifies JWT tokens before allowing protected actions

API requests follow a unified response structure:

{
  status: "success" | "fail",
  message: "Result explanation",
  data: {...}
}

📌 Usage Instructions

Sign up or log in using your Firebase credentials.

Access the dashboard to register crops and track batches.

View real-time weather information for your district.

Receive notifications and achievement logs.

Switch interface language (Bangla/English).

⚡ Contributing

Fork the repository

Create a new branch

Commit changes

Push and open a pull request

📄 License

MIT License
See LICENSE in the repository.

📧 Contact

Email: (Add your email here)

GitHub: https://github.com/Disa44ay

Agri-Shield – Empowering farmers with technology 🌱
