const cors = require("cors")
const express = require('express')
const pool = require("./indexbd.js")
const PORT = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const User = require('./User.js');
const corsOption = {
    origin:"http://localhost:5173"
}
app.use(bodyParser.json());
app.use(cors(corsOption))
app.listen(PORT, () =>{
    console.log(`server starting ${PORT}`)
})
app.get("/price", async(req,res) =>{
    try{
        const addTodor = await pool.query("SELECT * FROM price")
        res.json(addTodor.rows)
    }
    catch(err){
        console.error(err.message)
    }
})

app.get("/users", async(req,res) =>{
    try{
        const addTodor = await pool.query("SELECT * FROM users")
        res.json(addTodor.rows)
    }
    catch(err){
        console.error(err.message)
    }
})