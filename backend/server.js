// entry point of backend
import path from 'path'
import express from 'express'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound,errorHandler } from './Middleware/errorHandler.js'
import cookieParser from 'cookie-parser'
import uploadRoutes from './routes/uploadRoutes.js'
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




app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)
// paypal route transaction
app.get('/api/config/paypal',(request,response) => response.send({clientId: process.env.PAYPAL_CLIENT_ID}))


// For making uploads folder static
const __dirname = path.resolve()  // setting dirname to current directory
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))


// For deployment
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    // if route is not found,then load index.html
    app.get('*', (request,response) => response.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}else{
    app.get('/' , (request,response) => {
        response.send("API is running....")
    })
}

app.use(errorHandler)
app.use(notFound)

app.listen(port,()=> console.log(`server running on ${port}`))

