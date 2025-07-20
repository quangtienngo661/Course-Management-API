const express = require('express')
const app = express();
const authRoutes = require('./routes/auth.routes');
const courseRoutes = require('./routes/course.routes');
const userRoutes = require('./routes/user.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');
const authMiddleware = require('./middlewares/auth.middleware')
const connectDB = require('./configs/db');
const { registerUserValidation } = require('./validators/user.validator');
const { validateRequest } = require('./middlewares/validation.middleware');
const globalErrorHandler = require('./temp/errorHandler.middleware');
require('dotenv').config();

app.use(express.json())
app.use(express.urlencoded());
connectDB();

// Authentication
app.use('/auth', registerUserValidation, validateRequest, authRoutes)

// User
app.use('/users', authMiddleware, userRoutes)

// Course
app.use('/courses', authMiddleware, courseRoutes)

// Enrollment
app.use('/users', authMiddleware, enrollmentRoutes)
app.use('/courses', authMiddleware, enrollmentRoutes)

// Error handler
app.use(globalErrorHandler)


app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}....`)
})