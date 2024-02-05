import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AppRoutes from "./src/routes/router.js"


dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json())
app.use("/",AppRoutes);

app.get('/',(req,res)=>{
    res.send("Welcome to My ToDo App")
})

app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));