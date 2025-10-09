import dotenv from "dotenv";
dotenv.config();   
import cors from "cors";
import express from "express";
import authRouter from "./router/auth-router.js";      
import contactRouter from "./router/contact-router.js"; 
import serviceRouter from "./router/service-router.js"; 
import adminRouter from "./router/admin-router.js"; 
import { connectDB } from "./utils/db.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended : true}))
app.use("/api/auth", authRouter);       
app.use("/api/form", contactRouter);     
app.use("/api/data", serviceRouter);     
app.use("/api/admin", adminRouter);     
app.use(errorMiddleware)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
