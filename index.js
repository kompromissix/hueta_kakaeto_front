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
app.post('/price/user', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { name_user } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 20);
        const hashedage = await hash(age_user, 2);
        const hashedmail = await hash(mail_user);
        const hashednick = await hash(nick_user, 20);
        const hashednumber = await hash(number, 20);
        const user = await User.create({ name_user, password, age_user, mail_user, nick_user, number: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
});
