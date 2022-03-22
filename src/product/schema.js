import mongoose from "mongoose"
const {Schema, model} = mongoose
const ProductModel = new Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true},

    },

    {timeStamps: true}
)
export default model("product" , ProductModel)