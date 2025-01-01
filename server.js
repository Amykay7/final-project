//import necessary dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const db = require('./config/db');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const path = require('path');
const dotenv = require('dotenv');
const plannerRoutes = require('./router/plannerRoute');

//load environment variables
dotenv.config();
//initialise the server
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

//config session management
const sessionStore = new MySQLStore({},db);
app.use(session({
  key: 'session_cookie_name',
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 6*60*60*1000
  }
}));

// Import auth routes
const authRoutes = require('./router/auth'); 

// Middleware for auth routes
app.use('/auth', authRoutes);


// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));


//planner
// Middleware
app.use(bodyParser.json());  // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded data

// Routes
app.use('/api/planner', plannerRoutes);  // Use planner routes for all /api/planner endpoints

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
