// Import the database pool
const bcrypt = require('bcryptjs');
const db = require('../config/db'); 

// Controller for user registration
const registerUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Check if the user already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
            username,
            email,
            hashedPassword,
        ]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = rows[0];

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Set session data
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email,
        };

        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller for user logout
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('session_cookie_name'); // Clear the cookie
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

module.exports = { registerUser, loginUser, logoutUser };
