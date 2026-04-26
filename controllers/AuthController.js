// imoprt user model, used to interact with users collection in DB
const User = require('../models/User');
// imoprt bcrypt to hash password
const bcrypt = require('bcryptjs');
// imoprt jwt for authorization token
const jwt = require('jsonwebtoken');

// registeration async function
exports.registerUser = async (req, res) => {
    try{
        // get these fields from req body
        const { name, email, password } = req.body;
        
        // check if the email already taken by the user (already in DB)
        const userExists = await User.findOne({ email });
        // If exist, send error
        if (userExists) {
            return res.status(400).json({ message: "User already exists..." });
        }
        // Use bcrypt to make password hash (never store plain password)
        // 10 = salt rounds (security level)
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // create document in DB with these fields
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        // give response when successfully created
        res.status(200).json(user);
    }
     catch(err){
        // handle server error
        console.log("Server side running Error.", err.message);
        res.status(500).json({message: err.message})
     }   
};

// login async function
exports.loginUser = async (req, res) => {
    try{
        // Get these fields from req body
        const { email, password } = req.body;
        
        // Find the user with the provided email
        const user = await User.findOne({ email });
        
        // If email is found and password is matched using bcrypt.compare
        if (user && (await bcrypt.compare(password, user.password))) {
            // Generate token 
            const token = jwt.sign(
                { id: user._id },   // payload
                process.env.JWT_SECRET, // secret key
                { expiresIn: '24h' }    // expires in
            );
            console.log("JWT SECRET (login):", process.env.JWT_SECRET);
            // give token in response
            res.json({ token });
        } else {
            // if enter incalid credentials
            res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch(err){
        // throw error when server error
        console.log('Internal error: ', err.message);
        res.status(500).json({message: err.message})
    }
};
