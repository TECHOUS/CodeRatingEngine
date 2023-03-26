const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const app = express()

// exclusing dotenv config from production
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// setting up the rate limiter
const rateLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_MINUTES * 60 * 1000, // 1 minute
    max: process.env.RATE_LIMIT_MAX_REQUEST,
    message: {
        status: 429,
        error: 'Too many requests, please try again later!!!',
    },
})

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1)

// rate limiting middleware
app.use(rateLimiter)

// CORS Middleware
app.use(cors())

// express middleware handling the body parsing
app.use(express.json())

// express middleware handling the form parsing
app.use(express.urlencoded({extended: false}))

// middleware for handling sample api routes
app.use('/api/v1', require('../routes/api/v1/API'))

module.exports = app
