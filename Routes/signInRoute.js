const express = require('express')
const knex = require('knex')
const bcrypt = require('bcrypt')
const router = express.Router()
const { db } = require('../database')

router.post('/', (req,res) => {
    try {
        const{password , email} = req.body
        db.select('email','hash').from('signedIn')
        .where("email",'=',email)
        .then((data)=>{
        const isValid = bcrypt.compareSync(password,data[0].hash)
        if(isValid){
           return db.select('*')
            .from('users')
            .where("email",'=',email)
            .then((users) => {res.json(users[0])
            }).catch ((err) => res.status(400).json('Unable to get user info'))
         } else {
            res.status(400).json('Wrong user info')
        }
     }).catch ((err) => res.status(400).json('Wrong user info'))
    } catch (error) {
        console.log('User not found')
    }
})

module.exports = router










//sign-in route
// app.post('/signin',(req,res) =>{
//     const{password , email} = req.body
//     db.select('email','hash').from('login')
//     .where("email",'=',email)
//     .then((data)=>{
//         const isValid = bcrypt.compareSync(password,data[0].hash)
//         if(isValid){
//            return db.select('*')
//             .from('users')
//             .where("email",'=',email)
//             .then((users) => {res.json(users[0])
//             }).catch ((err) => res.status(400).json('unable to get user info'))
//         } else {
//             res.status(400).json('wrong user info')
//         }
//     }).catch ((err) => res.status(400).json('wrong user info'))
// })
