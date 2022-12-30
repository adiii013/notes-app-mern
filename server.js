require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/users',userRouter)
app.use('/api/notes',noteRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("./build"));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, ".", "build", "index.html"))
    );
}

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log("Server is  running")
})

const URI = process.env.MONGO_URL
mongoose.set("strictQuery", false);
mongoose.connect(URI,err=>{
    if(err) console.log('Could not connect to MongoDb');
    else console.log('Connected to MongoDb')
})