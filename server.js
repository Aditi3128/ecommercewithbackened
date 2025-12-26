// // import express from "express";
// // import dotenv from "dotenv";
// // import cors from "cors";
// // import connectDB from "./config/db.js";
// // import authRoutes from "./routes/authRoutes.js";

// // // Load env variables
// // dotenv.config();

// // // Connect MongoDB
// // connectDB();

// // const app = express();

// // // Middlewares
// // app.use(cors());
// // app.use(express.json());

// // // ✅ Test route (debug purpose)
// // app.get("/", (req, res) => {
// //   res.send("🚀 FASCO Backend API is running");
// // });

// // // ✅ Auth routes
// // app.use("/api/auth", authRoutes);

// // // Port
// // const PORT = process.env.PORT || 5000;

// // // Start server
// // app.listen(PORT, () => {
// //   console.log(`✅ Server running on http://localhost:${PORT}`);
// // });
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";

// // 🔥 ADD THIS LINE (VERY IMPORTANT – DEV ONLY)
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// // Load env variables
// dotenv.config();

// // Connect MongoDB
// connectDB();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get("/", (req, res) => {
//   res.send("🚀 FASCO Backend API is running");
// });

// // Auth routes
// app.use("/api/auth", authRoutes);

// // Port
// const PORT = process.env.PORT || 5000;

// // Start server
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database
connectDB();

// routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("FASCO Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
