const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

//REGISTER USER
router.post('/register', async(req, res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json("Wrong password or username");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(401).json("Wrong password or username");
        }

        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "30d" });
        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken });
    } catch (err) {
        console.error("Error in login route:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
