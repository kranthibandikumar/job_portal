const express = require("express")
require("dotenv").config()
var cors = require('cors')
const connectDB = require("./config/db")
const userRouter = require("./routes/user.route")
const jobRouter = require("./routes/job.route")
const applicationRouter = require("./routes/application.route")


const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT

app.get("/health", (req,res) =>{
    res.send("Healthy API is working fine...")
})


app.use("/users", userRouter)
app.use("/jobs", jobRouter)
app.use("/applications", applicationRouter)


app.listen(PORT, async() => {

    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`)
})

