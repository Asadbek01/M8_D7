import express from "express"
import productRouter from "./product/index.js"

const app = express()
app.use(express.json())

app.get('/test', function (req, res) {
    res.send({ message: 'Test success' })
})

app.use('/products', productRouter)

export { app }