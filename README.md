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

> Add images in a `screenshots/` folder in the repo

```markdown
![Home Page](screenshots/home.png)
![Product Page](screenshots/product.png)
![Cart Page](screenshots/cart.png)

🚀 Getting Started (Local Setup)
Follow these steps to run the project on your local machine:

1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/Flatheads.git
cd Flatheads
2. Setup the backend
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
Run the backend server:

bash
Copy
Edit
npm run dev
3. Setup the frontend
Open a new terminal:

bash
Copy
Edit
cd frontend
npm install
npm run dev
🛒 Folder Structure
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
☁️ Deployment Steps (Render)
🔧 Backend Deployment
Go to Render

Create a new Web Service

Connect your GitHub repo

Set root directory to backend/

Add all environment variables from your .env file

Build Command: npm install

Start Command: npm run dev

🎨 Frontend Deployment
Create another Web Service or Static Site

Set root directory to frontend/

Build Command: npm install && npm run build

Set dist/ folder as the publish directory

🙋‍♀️ Author
Shravani Santosh Rane
Computer Science Graduate | Full Stack Developer

🌐 Portfolio: Coming Soon

💼 LinkedIn

💻 GitHub

📄 License
This project is open source and available under the MIT License.

yaml
Copy
Edit

---

✅ You can now paste this into your `README.md` file.  
Let me know if you want badges, GIF demos, or a short video walkthrough section added!
