const express = require('express');
const router = express.Router();
const User = require('../model/userSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
// const app = express()
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var nodemailer = require('nodemailer')

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

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ status: "User not found!" });
        }
        const secret = process.env.SECRET + user.password;
        const token = jwt.sign({ email: user.email, id: user._id }, secret, {
            expiresIn: "5m"
        })
        const link = `http://localhost:5000/reset-password/${user._id}/${token}`;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'grp43acts@gmail.com',
                pass: 'xroxepntlakbaoyq'
            }
        });

        var mailOptions = {
            from: 'grp43acts@gmail.com',
            to: user.email,
            subject: 'Reset password',
            text: link
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (err) {
        console.error(err);
    }
})

router.get("/reset-password/:id/:token", async (req, res) => {
    console.log("checking")
    const { id, token } = req.params;
    const user = await User.findOne({ _id: id })
    if (!user) {
        return res.json({ status: "User not found!" });
    }
    const secret = process.env.SECRET + user.password;
    try {
        const verify = jwt.verify(token, secret);
        res.render("index", { email: verify.email, status: "Not verified" })
    } catch (err) {
        res.send("Not verified")
    }
    console.log(req.params);
    // res.status(200).send("done")
    // .json({ message: "done" });
})

router.post("/reset-password/:id/:token", urlencodedParser, async (req, res) => {
    console.log("updating")
    const { id, token } = req.params;
    // console.log(req.body);
    // console.log(req.body.password);
    // console.log(req.body.cpassword);
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    console.log(password, cpassword)
    if (password !== cpassword) {
        return res.json({ status: "Password do not match!" });
    }

    const user = await User.findOne({ _id: id })
    if (!user) {
        return res.json({ status: "User not found!" });
    }
    const secret = process.env.SECRET + user.password;
    try {
        const verify = jwt.verify(token, secret);
        const encPassword = await bcrypt.hash(password, 12)
        const encCpassword = await bcrypt.hash(cpassword, 12)
        await User.findByIdAndUpdate(id, {
            password: encPassword,
            cpassword: encCpassword
        });
        // res.json("password changed successfully")
        res.render("index", { email: verify.email, status: "verified" })
    } catch (err) {
        res.send("Not verified")
    }
})

module.exports = router;