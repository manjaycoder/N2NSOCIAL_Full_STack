import express from "express"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", // frontend
  credentials: true, // if you use cookies
}));

app.get("/", (req, res) => {
    res.send("Welcome to the API")
})
app.use('/auth', authRoutes)
app.use('/posts', postRoutes)
app.use('/chat', chatRoutes)


export default app
