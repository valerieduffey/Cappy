const express = require("express")
const cors = require("cors")
const session = require("express-session")
const db = require('./models')

const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}))

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false, 
    cookie: {
        maxAge: 24 * 60 * 60,  // 1 day
        httpOnly: true, //reducing the risk of cross-site scripting (XSS) attacks.
    },
}))

// Routers
const userRouter = require('./routes/Users.js')
app.use('/users', userRouter)
const recipeRouter = require('./routes/Recipe.js')
app.use('/recipe', recipeRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server is running")
    })
})
