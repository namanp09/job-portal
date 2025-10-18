# 🚀 Job Portal Web Application (MERN Stack)

A full-featured **Job Portal** web application where **job seekers** can register, apply for jobs, and track their applications, while **recruiters** can post and manage job listings. Built using the **MERN stack** and structured for real-world deployment.

Additionally, the project integrates **Google Gemini AI** to allow users to **analyze how well their resume matches a job description**, enhancing decision-making for applicants.

---

### 🛠️ Tech Stack

### 💻 Client
- **React.js** – UI framework  
- **React Router** – client-side routing  
- **Axios** – for API calls  
- **Tailwind CSS / Bootstrap / CSS Modules** – styling (choose based on your usage)

### 🌐 Server
- **Node.js** – JavaScript runtime  
- **Express.js** – backend framework  
- **Mongoose** – ODM for MongoDB  
- **JWT** – authentication  
- **Bcrypt.js** – password hashing
- **Google Gemini API** – for AI-powered resume-job matching 
  

### 🛢️ Database
- **MongoDB Atlas / Local MongoDB**

### 🔧 Dev Tools
- **VS Code** – code editor  
- **Postman** – API testing  
- **Nodemon** – auto-reload backend  
- **dotenv** – manage environment variables  

---

## 📁 Folder Structure

job-portal/

├── server/

│ ├── controllers/

│ ├── models/

│ ├── routes/

│ ├── middleware/

│ ├── config/

│ ├── server.js

├── client/

│ ├── src/

│ │ ├── components/

│ │ ├── pages/

│ │ ├── App.js

│ │ ├── index.js

├── .env

├── README.md


---

## ✅ Features

### 👤 Job Seekers
- Register/Login  
- View job listings  
- Apply to jobs  
- Track application status
- **Check resume-job match using Gemini AI** 

### 🏢 Recruiters
- Create and manage job listings  
- View applicants  
- Update/delete job posts  

### 🔒 Authentication & Authorization
- JWT-based secure login  
- Password hashing with Bcrypt  
- Protected routes based on roles  

---

## 🚦 Getting Started

### 📦 Server Setup

bash
cd server

npm install

npm run dev

Create a .env file in /server:

PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

⚠️ Note:
I have shared my .env file for reference, but you must delete it and create your own with your own credentials and secret keys before running the application.

🌐 Client Setup
cd cilent

npm install

npm start

Update API endpoints in your client to match your server routes:

http://localhost:5000/api/...

📈 Future Enhancements

Resume upload via Cloudinary

Admin dashboard for monitoring platform metrics

Email notifications on job applications

Advanced search & filters by role, experience, and location

Chat system between recruiters and applicants

Analytics dashboard for recruiters

🧠 Key Learning Areas

Full-stack development using MERN stack

Implementing JWT Authentication & Authorization

AI Integration with Gemini for intelligent resume analysis

RESTful API design and best practices

Responsive UI with Tailwind CSS and React

🧑‍💻 Author

Naman Padiyar
B.Tech (Computer Engineering), Delhi Technological University (DTU)




<img width="1440" alt="Screenshot 2025-06-27 at 5 29 04 PM" src="https://github.com/user-attachments/assets/815dda0d-bf71-41ec-829c-1826abd02559" />
<img width="1440" alt="Screenshot 2025-06-27 at 5 29 33 PM" src="https://github.com/user-attachments/assets/f40e68d1-9e7d-4acf-8a02-3275a11addcd" />
