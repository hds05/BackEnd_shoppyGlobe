const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try{

        const { name, email, password } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists..." });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(200).json(user);
    }
     catch(err){
        console.log("Server side running Error.", err.message);
        res.status(500).json({message: err.message})
     }   
};

exports.loginUser = async (req, res) => {
    try{

        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
            console.log("JWT SECRET (login):", process.env.JWT_SECRET);
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch(err){
        console.log('Internal error: ', err.message);
        res.status(500).json({message: err.message})
    }
};
