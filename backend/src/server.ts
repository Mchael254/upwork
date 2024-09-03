
import express, { json } from "express";
import dotenv from "dotenv";
import user_router from "./routes/userRouter";
import cors from "cors";


dotenv.config()
const port = process.env.PORT || 5200
const app = express()
app.use(json())
app.use(cors())

app.use('/user',user_router)

app.listen(port,()=>{
    console.log(`Upwork running on port ${port}`);
})