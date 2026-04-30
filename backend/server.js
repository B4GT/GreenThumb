require('dotenv').config() 


const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectToDB = require('./mongodb')

const adminProductRoutes = require('./routes/admin-route')
const authRoutes = require('./routes/auth-route')
const orderRoutes = require('./routes/order-route')

const app = express()

connectToDB()

const allowedOrigins = [ //This SHOULD allow it to function on both the server and running it locally
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://cs.umb.edu",
    "https://www.cs.umb.edu"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use(express.json())
app.use(cookieParser())

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' })
})

app.get('/', (req, res) => {
    res.send('Backend is running!')
})

app.use('/api/admin/products', adminProductRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is now listening to port ${PORT}`)
})