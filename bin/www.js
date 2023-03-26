#!/usr/bin/env node

const app = require('../api/app')

// use port from environment variables for production
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
