const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Login Controller
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }
       
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        res.status(200).json({ message: "User logged in successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Register Controller
const registerController = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new userModel({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { loginController, registerController };
