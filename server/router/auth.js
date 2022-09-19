const express = require('express');
const router = express.Router();
const User = require('../model/userSchema')
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
// const cookieParser = require('cookie-parser')

require('../db/connection')
router.get('/', (req, res) => {
    res.send("hello world from router")
})

// ASYNC AWAIT
//Registration part 
router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    //check for fields validation
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "please fill all required fields" });
    }
    //if user is unique
    try {
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            return res.status(400).json({ error: "Email already exists" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password not matching" })
        } else {
            //if not exists
            const user = new User({ name, email, phone, work, password, cpassword })
            //calls hashing method before saving
            await user.save()
            res.status(201).json("user registered successfully")
        }
    } catch (err) {
        console.log(err.response);
    }
})

//LOGIN route

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" })
        }
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            const token = await userLogin.generateAuthToken();
            console.log(token)
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials" })
            } else {
                res.json({ message: "Login successful" })
            }
        } else {
            res.status(400).json({ error: "Invalid credentials" })
        }
    } catch (err) {
        console.log(err);
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            phone: req.body.phone,
            work: req.body.work,
        });
        res.status(200).json("user updated successfully")
    } catch (err) {
        console.log(err);
    }
})

router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
})

router.get('/logout', (req, res) => {
    console.log("logout")
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200)
        .send("logout");
})
module.exports = router;