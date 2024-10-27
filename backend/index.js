require("dotenv").config();
const Razorpay = require("razorpay");
const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

app.use(express.json());
app.options("*", cors());

app.use(
  cors({
    origin: [
      "https://mern-e-commerce-admin-6jeo.onrender.com",
      "https://mern-e-commerce-frontend-044s.onrender.com",
    ],
  })
);

// Ensure upload/images directory exists
const dir = "./upload/images";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

app.use("/images", express.static(path.join(__dirname, "upload/images")));

// Database connection with MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL); // No options needed for latest version
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit on connection failure
  }
};

//API creation
app.get("/", (req, res) => {
  res.send("Express server is running");
});

// API for deleting products
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({ success: true, name: req.body.name });
});

// API for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("Retrieved all products");
  res.send(products);
});

// User schema
const Users = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});

// User registration
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "Email already exists" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();
  const data = { user: { id: user.id } };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token: token, userId: user.id });
});

// User login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, "secret_ecom");
      return res.json({ success: true, token: token, userId: user.id });
    } else {
      return res.json({ success: false, errors: "Invalid credentials" });
    }
  } else {
    return res.json({
      success: false,
      errors: "User does not exist! Wrong Email ID",
    });
  }
});

//New Arrivals
app.get("/newarrivals", async (req, res) => {
  let products = await Product.find({});
  let newarrivals = products.slice(1).slice(-8);
  console.log("New Arrivals Retrieved");
  res.send(newarrivals);
});

// Middleware for token authentication
const fetchUser = (req, res, next) => {
  const token = req.header("token");
  if (!token)
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
// Middleware to authenticate user
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized user" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, "secret_ecom");
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ success: false, message: "Invalid token" });
  }
};

// Add to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("adding", req.body.id);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.id] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.json("Added to cart");
});

//Remove from cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removing", req.body.id);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.id] > 0) {
    userData.cartData[req.body.id] -= 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.json("Removed from cart");
  }
});

//get cart
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("Retrieving cart data");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

//Define review schema
const reviewSchema = new mongoose.Schema({
  review: String,
  name: String,
  email: String,
  rating: Number,
});
const Review = mongoose.model("Review", reviewSchema);

// POST endpoint to create a new review
app.post("/allreviews", async (req, res) => {
  const { name, email, review, rating } = req.body;
  try {
    const newReview = new Review({
      name,
      email,
      review,
      rating,
    });

    await newReview.save(); // Save the review to MongoDB
    res.status(201).json(newReview); // Send the saved review back to the client
  } catch (error) {
    res.status(500).json({ message: "Error submitting review", error });
  }
});

// GET endpoint to retrieve all reviews
app.get("/allreviews", async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

// Image storage engine
const storage = multer.diskStorage({
  destination: dir,
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

// Creating upload endpoints for images
app.post("/upload", upload.single("product"), async (req, res) => {
  console.log(req.file); // Log the uploaded file details
  res.json({
    success: 1,
    image_url: `https://mern-e-commerce-frontend-044s.onrender.com/images/${req.file.filename}`,
  });
});

// Razorpay Initialization
const razorpay = new Razorpay({
  key_id: process.env.VITE_RAZORPAY_KEY_ID,
  key_secret: process.env.VITE_RAZORPAY_SECRET_KEY,
});

// Product schema and model
const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});
const Product = mongoose.model("Product", productSchema);
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } /*If there are no products */ else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Order Model
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Processing ..." },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
  receipt: { type: String, required: true },
  razorpay_order_id: { type: String, required: true },
});

//Commission Model
const commissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    referenceImage: { type: String, required: true },
    preferredMedium: { type: String, required: true },
    budget: { type: Number, required: true },
    deliveryDeadline: { type: Date, required: true },
  },
  { timestamps: true }
);

const Commission = mongoose.model("Commission", commissionSchema);

// API endpoint to handle commission requests
app.post(
  "/commission-request",
  upload.single("referenceImage"),
  async (req, res) => {
    try {
      const {
        name,
        email,
        description,
        preferredMedium,
        budget,
        deliveryDeadline,
      } = req.body;

      // Check if the required fields are present
      if (
        !name ||
        !email ||
        !description ||
        !preferredMedium ||
        !budget ||
        !deliveryDeadline ||
        !req.file
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      // Create a new commission entry
      const newCommission = new Commission({
        name,
        email,
        description,
        referenceImage: `http://localhost:${port}/images/${req.file.filename}`, // URL for the uploaded image
        preferredMedium,
        budget,
        deliveryDeadline,
      });

      await newCommission.save(); // Save the commission request to MongoDB

      res.status(201).json({
        success: true,
        message: "Commission request submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting commission request:", error);
      res.status(500).json({
        success: false,
        message: "Error submitting commission request",
      });
    }
  }
);

const Order = mongoose.model("Order", orderSchema);

// Place order and initiate payment
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, razorpay_order_id } = req.body;
    const receiptNumber = `REC-${Date.now()}`;

    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });

    const newOrder = new Order({
      userId,
      items,
      receipt: receiptNumber,
      amount,
      address,
      razorpay_order_id: "default",
    });

    await newOrder.save();

    // Clear user cart after order
    await Users.findByIdAndUpdate(userId, { cartData: {} });

    // Create Razorpay order
    const session = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: receiptNumber,
      payment_capture: 1,
    });

    console.log("Razorpay session:", session);

    // Save the order id in the database
    newOrder.razorpay_order_id = session.id;
    await newOrder.save();

    // Send the order id to the front-end
    res.json({ success: true, orderId: session.id });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Error placing order" });
  }
};

// Payment verification endpoint
app.post("/order/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.VITE_RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const order = await Order.findOne({ razorpay_order_id });
    console.log("Order:", order);
    console.log(razorpay_order_id);

    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order id" });
    }

    // Mark order as 'paid'
    await Order.findOneAndUpdate(
      { _id: order._id },
      { status: "Paid", payment: true }
    );

    res.status(200).json({ success: true, message: "Payment verified" });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }
});

// Route for placing order
app.post("/order/place", authMiddleware, placeOrder);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start the server
const startServer = async () => {
  await connectDB();
  app.listen(port, () =>
    console.log(`Backend server is running on port ${port}`)
  );
};

startServer();
