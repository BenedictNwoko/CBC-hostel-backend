const express = require('express')
//const bcrypt = require('bcrypt')
const router = express.Router()
const cors = require("cors")
require('dotenv').config()
//const knex = require('knex')
const { response } = require('express')
const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 9002

// Root route 
app.get('/', (req,res)=>{
    res.send('yo')
}); 

//sign-in route
const signinRoute = require('./Routes/signInRoute')
app.use('/signin', signinRoute)

//sign-in route
const profileRoute = require('./Routes/profileRoute')
app.use('/profile', profileRoute)

//register route
const registerRoute = require('./Routes/registerRoute')
app.use('/register', registerRoute)

//payment route
const paymentRoute = require('./Routes/paymentRoute')
app.use('/payment', paymentRoute)




app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
