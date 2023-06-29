// entry point of backend
import express from 'express'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound,errorHandler } from './Middleware/errorHandler.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

// frontend running on 3000

connectDB()

const port = process.env.PORT || 5000

const app= express()

// Body parser middleware

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// cookie parser middleware  for accessing request.cookies
app.use(cookieParser())


app.get('/' , (request,response) => {
    response.send("API is running....")
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
// paypal route transaction
app.get('/api/config/paypal',(request,response) => response.send({clientId: process.env.PAYPAL_CLIENT_ID}))

app.use(errorHandler)
app.use(notFound)

app.listen(port,()=> console.log(`server running on ${port}`))

