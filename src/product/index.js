import express from "express"
import ProductsModel from "../product/schema.js"
const ProductRouter = express.Router()
// 1
ProductRouter.post("/", async (req, res, next) => {
    try {
        const product = new ProductsModel(req.body)
        await product.save()
        res.status(201).send(product)
    } catch (error) {
        next(error)
    }
})
// 2
ProductRouter.get("/", async (req, res, next) => {
    try {
        const products = await ProductsModel.find({})
        res.status(201).send(products)
    } catch (error) {
        next(error)
    }
})
// 3
ProductRouter.get("/:id", async (req, res, next) => {
    try {
        const product = await ProductsModel.findById(req.params.id)
        res.send(product)
    } catch (error) {
      res.status(404).send(error)
    }
})
// 4
ProductRouter.put("/:id", async (req, res, next) => {
    try {
    } catch (error) {
        next(error)
    }
})
// 5
ProductRouter.get("/:id", async (req, res, next) => {
    try {
    } catch (error) {
        next(error)
    }
})

export default ProductRouter