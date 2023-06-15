import express from 'express'
import products from './data/products.js'
// frontend running on 3000
const port = 5000

const app= express()

app.get('/' , (request,response) => {
    response.send("API is running....")
})

app.get('/api/products', (request,response) => {
    response.json(products)
})

app.get('/api/products/:id', (request,response) => {
    response.json(products.find((product) => (product._id === request.params.id)))
})

app.listen(port,()=> console.log(`server running on ${port}`))

