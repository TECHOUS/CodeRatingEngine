const express = require('express');
const cors = require('cors');
const rateLimit = require("express-rate-limit");

const app = express();

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,    // 1 minute
    max: 10,
    message: {
        status: 429,
        error: "Too many requests, please try again later!!!"
    }
});

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

// rate limiting middleware
app.use(rateLimiter);

// exclusing dotenv config from production
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// CORS Middleware
app.use(cors());

// express middleware handling the body parsing 
app.use(express.json());

// express middleware handling the form parsing
app.use(express.urlencoded({extended: false}));

// middleware for handling sample api routes
app.use('/api/v1', require('./routes/api/API'));

// use port from environment variables for production
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
