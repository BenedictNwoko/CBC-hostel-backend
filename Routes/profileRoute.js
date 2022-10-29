const express = require('express')
const router = express.Router()
const { db } = require('../database')


router.get('/', (req,res) => {
    //console.log(req.params.id)
        // const { id }  = req.params
        // let found = false
    
        // db.select('*').from('users').where({
        //     id:id
        // }).then(users=>{
        //     if (users.length){
        //         res.json(users[0])
        //     }else{
        //         res.status(400).json('not found')
        //     }
        // })
        // .catch(err => res.status('400').json('not found'))

})



module.exports = router