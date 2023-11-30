const express = require('express')
const app = express()
const customers = require('./customs.json')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const dotnev = require('dotenv').config()

const port = process.env.PORT || 3001

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world !")
})

app.get('/customers', (req, res) => {
    res.send(customers)
})

app.get('/product', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.listen(port, () => {
    console.log('App is listening to port ${port}')
})
app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

//update
app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(400).json({ message: `cannot find any product with Id:${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
})

///delete

app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with Id ${id}` })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// mongoose.connect('mongodb+srv://jayakumarsf2020:Dec122023!@testnodeapi.pnthbup.mongodb.net/myCollection?retryWrites=true&w=majority')
//     .then(() => {
//         console.log("connected to MongoDB")
//         app.listen(3002, () => { console.log(`Node API app is running on port 3002`) })
//     }).catch((error) => { console.log(error) })

mongoose.connect(process.env.MONGODB_URL).then((success) => app.listen(3002)).catch((err) => console.log(err.message))





