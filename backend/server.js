import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

// Importing the database connection function from db.js
import { connectDB } from "./config/db.js";

// Setting the port for the server to listen on
const PORT = process.env.PORT || 5000;

// Connecting to the database
connectDB();

// Creating an instance of the Express application
const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Importing the routers for different routes
import Productrouter from "./routes/productRoute.js";
import UserRouter from "./routes/userRoutes.js";
import OrderRouter from "./routes/orderRoute.js";
import UploadRouter from "./routes/uploadRoute.js";
// Importing custom error handling middleware functions
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Mounting the product route handler on "/api/products"
app.use("/api/products", Productrouter);

// Mounting the user route handler on "/api/users"
app.use("/api/users", UserRouter);

// Mounting the user route handler on "/api/orders"
app.use("/api/orders", OrderRouter);

// Mounting the PayPal route handler on "/api/config/paypal"
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//  Ready for production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  // any route that is not api will be redirected to to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Hello, this is your Express server!");
  });
}

// Mounting the image handler on "/api/upload"
app.use("/api/upload", UploadRouter);

// Custom error handling middleware to handle 404 (Not Found) errors
app.use(notFound);

// Custom error handling middleware to handle other errors
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
