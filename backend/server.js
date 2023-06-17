// entry point of backend
import express from 'express'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound,errorHandler } from './Middleware/errorHandler.js'
import dotenv from 'dotenv'
dotenv.config()

// frontend running on 3000

connectDB()

const port = process.env.PORT || 5000

const app= express()



app.get('/' , (request,response) => {
    response.send("API is running....")
})

app.use('/api/products',productRoutes)

app.use(errorHandler)
app.use(notFound)

app.listen(port,()=> console.log(`server running on ${port}`))

