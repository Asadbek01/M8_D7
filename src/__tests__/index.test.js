import { app } from '../app.js'
import supertest from "supertest"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const request = supertest(app)

describe("Just trying out Jest and making sure it's all good", () => {
   
    test("should test that true is true", () => {
        expect(true).toBe(true);
    })

    test("that false is not true", () => {
        expect(false).not.toBe(true);
    })
})


/************************************** Testing endpoints ***************************************/ 

describe("testing the endpoints",  () =>{
    
    beforeAll( async () => {

        console.log("before All tests.... see me I am here ")
        await  mongoose.connect(process.env.MONGO_CONNECTION)
        console.log("Connected to mongo Hurray")
})


test("should test that the test endpoint returns a success message", async () => {
    const response = await request.get("/test")
    expect(response.body.message).toBe("Test success")
})



const validProduct = {
        name: "Test Product",
        price: 100,
        description: "cool"
    }

    it("should test that the POST /products endpoint returns the newly created product", async () => {
        const response = await request.post("/products").send(validProduct)
        expect(response.body._id).toBeDefined()

        console.log(response.body)
    })

    // const invalidData = {
    //     whatever: 'something'
    // }

    // test("should test that POST /products with INVALID data returns 400", async () => {
    //     const response = await request.post("/products").send(invalidData)
    //     expect(response.status).toBe(400)
    // })
        let theProductId
        test("should test that the GET /products endpoint returns the product we just created", async () => {
                const response = await request.get("/products")
                expect(response.body.length).toBe(1)
            
                theProductId = response.body[0]._id
            })
            
            
            test(" should test that test GET/endpoint and gives the created product", async () =>{
        const response = await request.get(`/products/${theProductId}`)
        expect(response.body.name).toBe(validProduct.name)
    
    })
    test("should test that the GET /products/:id returns 404 on a non-existent product", async () => {
        const response = await request.get("/products/:123456123456123456123456")

        expect(response.status).toBe(404)
    })
    afterAll(async () => {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
    
        console.log("Closed Mongo connection.")
    })
})