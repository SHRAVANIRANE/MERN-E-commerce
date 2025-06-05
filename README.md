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

| Frontend        | Backend           | Database     | Other Tools           |
|-----------------|-------------------|--------------|------------------------|
| React.js        | Node.js + Express | MongoDB      | Cloudinary (Images)   |
| Tailwind CSS    | JWT Auth          | Mongoose     | Razorpay (Payments)   |
| React Router    | REST API          |              | Render (Deployment)   |

---

## 📸 Screenshots

> Add your screenshots in a folder named `screenshots/` in the root of your repo.

![Home Page](screenshots/home.png)  
![Product Page](screenshots/product.png)  
![Cart Page](screenshots/cart.png)

---

## 🚀 Getting Started (Local Setup)

Follow these steps to run the project on your local machine:

### 1. Clone the repository

git clone https://github.com/your-username/Flatheads.git
cd Flatheads

shell
Copy
Edit

### 2. Setup the backend

cd backend
npm install

go
Copy
Edit

Create a `.env` file inside the `backend/` folder and add:

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET_KEY=your_razorpay_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

yaml
Copy
Edit

Run the backend server:

npm run dev

csharp
Copy
Edit

### 3. Setup the frontend

Open a new terminal:

cd frontend
npm install
npm run dev

yaml
Copy
Edit

---

## 🛒 Folder Structure

Flatheads/
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── uploads/images/
│ └── index.js
├── screenshots/
├── README.md

markdown
Copy
Edit

---

## ☁️ Deployment Steps (Render)

### 🔧 Backend Deployment

1. Go to [Render](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repo
4. Set root directory to `backend/`
5. Add environment variables from your `.env` file
6. **Build Command:** `npm install`
7. **Start Command:** `npm run dev`

### 🎨 Frontend Deployment

1. Create another Web Service or Static Site
2. Set root directory to `frontend/`
3. **Build Command:** `npm install && npm run build`
4. Set `dist/` as the publish directory

---

## 🙋‍♀️ Author

**Shravani Santosh Rane**  
Computer Science Graduate | Full Stack Developer

- 🌐 Portfolio: *Coming Soon*
- 💼 [LinkedIn](https://linkedin.com/in/shravani-rane)
- 💻 [GitHub](https://github.com/shravani-rane)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
