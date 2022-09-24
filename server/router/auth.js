const express = require('express');
const router = express.Router();
const User = require('../model/userSchema')
const Movie = require('../model/movie')
const Show = require('../model/show')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var nodemailer = require('nodemailer')
const multer = require("multer");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");
const fs = require('fs');
var path = require('path');



require('../db/connection')
router.get('/', (req, res) => {
    res.send("hello world from router")
})

// ASYNC AWAIT
//Registration part 
router.post('/register', async (req, res) => {

    const { name, email, phone, password, cpassword } = req.body;
    //check for fields validation
    if (!name || !email || !phone || !password || !cpassword) {
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
            const user = new User({ name, email, phone, work: "User", password, cpassword })
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
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            res.cookie("work", userLogin.work, {
                expires: new Date(Date.now() + 900000000),
                httpOnly: true
            });
            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials" })
            } else if (userLogin.work === "Admin") {
                res.status(201).json({ message: "Admin Login" })
            }
            else {
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
})

router.post("/reset-password/:id/:token", urlencodedParser, async (req, res) => {
    const { id, token } = req.params;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
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
        res.render("index", { email: verify.email, status: "verified" })
    } catch (err) {
        res.send("Not verified")
    }
})

//storage
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({
    storage: Storage
}).single('testImage')

//movie register

router.post("/movieregister", async (req, res) => {
    upload(req, res, (error) => {
        if (error) {
            console.log(error)
        } else {
            try {
                const { name, actors, director, certification, genre, length, release_date, start_date, end_date, first_show, second_show, image } = req.body;
                const newMovie = new Movie({
                    name, actors, director, certification, genre, length, release_date, start_date, end_date, first_show, second_show, image
                })
                newMovie.save()
                res.status(201).json("movie added successfully")
            } catch (error) {
                console.error(error)
            }
        }
    })
})

router.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).send({ data: movies })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

router.get("/moviedetails/:id", async (req, res) => {
    try {
        const movies = await Movie.findById(req.params.id);
        res.status(200).send({ data: movies })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

router.delete("/delmovie/:id", async (req, res) => {
    try {
        const movies = await Movie.findOneAndDelete(req.params.id);
        res.status(200).send({ data: "deleted", name: movies.name })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

//bookticket

router.get('/bookticket/:id', authenticate, (req, res) => {
    res.send(req.rootUser);
})

//Shows
router.post('/addshows', async (req, res) => {
    const { movieId, show, time, platinumRows, platinumRate, goldRows, goldRate, silverRows, silverRate } = req.body;
    const newShow = new Show({ movieId, show, time, platinumRows, platinumRate, goldRows, goldRate, silverRows, silverRate })
    await newShow.save();
    res.status(201).json("show added successfully")
})

module.exports = router;