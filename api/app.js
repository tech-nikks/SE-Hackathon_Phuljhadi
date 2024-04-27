import express  from "express"
import cors from 'cors'
import { connectDB } from "./db.js"
import userRouter from "./routes/auth.route.js"
import 'dotenv/config'

// app config
const app = express()
const port = 4000


// middlewares
app.use(express.json())
app.use(cors())

connectDB()

// api endpoints
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))