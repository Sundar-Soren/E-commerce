const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const ProductCardSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
})

const ProductCard = mongoose.model('ProductCard', ProductCardSchema)

const OrderSchema = mongoose.Schema({
    products: [ProductCardSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
        type: String,
        default: "recieved",
        enum: ["cencelled", "delivered", "shipped", "processing", "recieved"]

    },
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: true })



const Order = mongoose.model('Order', OrderSchema)

module.exports = { Order, ProductCard }