const express = require('express')
const app = express();
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const userRoutes = require('./routes/user.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const authMiddleware = require('./middlewares/auth.middleware')
const connectDB = require('./configs/db');
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded());
connectDB();

// Authentication
app.use('/auth', authRoutes)

// User
app.use('/users', authMiddleware, userRoutes)

// Course
app.use('/courses', authMiddleware, courseRoutes)

// Enrollment
app.use('/users', authMiddleware, enrollmentRoutes)
app.use('/courses', authMiddleware, enrollmentRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}....`)
})