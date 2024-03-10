import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";
import Book from "./models/Book.js"

/* App Config */
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

/* Middlewares */
app.use(express.json());
app.use(cors());

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

/* MongoDB connection */
mongoose.connect(
  process.env.MONGO_URL="mongodb://Karthik456:Karthik456@ac-thyoayl-shard-00-00.lvk9p0l.mongodb.net:27017,ac-thyoayl-shard-00-01.lvk9p0l.mongodb.net:27017,ac-thyoayl-shard-00-02.lvk9p0l.mongodb.net:27017/?ssl=true&replicaSet=atlas-29dowq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MONGODB CONNECTED");
  }
);

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find(); // Retrieve all books
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

/* Port Listening In */
app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});
