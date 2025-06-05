# 👟 Flatheads - Full Stack E-commerce Shoe Store

Flatheads is a modern and responsive full-stack e-commerce web application built using the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to browse and buy custom-designed shoes, while the admin can manage products and orders via a dedicated admin panel.

🔗 **Live Demo:** [https://flatheads-ecom.onrender.com](https://flatheads-ecom.onrender.com)

---

## ✨ Features

### 👥 User Features
- 🛍 Browse shoes by categories and filters
- ➕ Add items to cart and wishlist
- 🔐 Secure login/signup with JWT-based auth
- 💳 Razorpay integrated checkout system
- ⭐ Product reviews and star ratings
- 📦 Track orders and view order history

### 🛠 Admin Features
- 📦 Add, update, delete products
- 📊 Manage all orders and shipping status
- 👤 View all users and their orders
- ☁️ Upload product images via Cloudinary

---

## 🧱 Tech Stack

| Frontend        | Backend         | Database     | Other Tools           |
|-----------------|------------------|--------------|------------------------|
| React.js        | Node.js + Express | MongoDB      | Cloudinary (Images)   |
| Tailwind CSS    | JWT Auth         | Mongoose     | Razorpay (Payments)   |
| React Router    | REST API         |              | Render (Deployment)   |

---

## 📸 Screenshots

> Add images in a `screenshots/` folder in the repo


---

## 🚀 Getting Started (Local Setup)

Follow these steps to run the project on your local machine:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Flatheads.git
cd Flatheads
### 2. Setup the backend
bash
Copy
Edit
cd backend
npm install
Create a .env file inside the backend/ folder and add:

env
Copy
Edit
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET_KEY=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Then run the backend:

bash
Copy
Edit
npm run dev
### 3. Setup the frontend
In a separate terminal:

bash
Copy
Edit
cd frontend
npm install
npm run dev
## 🛒 Folder Structure
css
Copy
Edit
Flatheads/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/images/
│   └── index.js
├── screenshots/
├── README.md

## ☁️ Deployment Steps (Render)
### Backend Deployment
Go to Render

Create a new web service

Connect your GitHub repo

Set root directory to backend/

Add environment variables from .env

Build Command: npm install

Start Command: npm run dev

### Frontend Deployment
Create another web service or static site

Set root directory to frontend/

Build Command: npm install && npm run build

Publish the dist folder

## 🙋‍♀️ Author
Shravani Santosh Rane
Computer Science Graduate | Full Stack Developer

🌐 Portfolio: Coming Soon

💼 LinkedIn: linkedin.com/in/shravani-rane

💻 GitHub: github.com/shravani-rane

## 📄 License
This project is open source and available under the MIT License.

yaml
Copy
Edit

---

Let me know if you'd like me to generate badge icons or customize sections based on screenshots or your Render project 

