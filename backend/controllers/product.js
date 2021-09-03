const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "No Product Is found"
                })
            }
            req.product = product
            next()
        })
}

exports.createProduct = (req, res) => {

    const form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with the image"
            })
        }
        const { name, description, price, category, stock } = fields

        if (!name || !description || !price || !category || !stock) {
            res.status(400).json({
                error: "Please fill the fields properly"
            })
        }
        const product = new Product(fields)
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "Photo is two big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to Add the Product"
                })
            }
            res.json(product)
        })
    })


}

exports.getProduct = (req, res) => {
    // console.log("I reached here");
    // req.product.photo = undefined
    console.log(req.product);
    return res.json(req.product)
}

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.deleteProduct = (req, res) => {
    const product = req.product
    product.remove((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "Unable to delete the product"
            })
        }
        res.json({
            Message: "Product successfully deleted "
        })
    })
}

exports.updateProduct = (req, res) => {

    const form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with the image"
            })
        }

        let product = req.product
        product = _.extend(product, fields)

        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "Photo is two big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to Add the Product"
                })
            }
            res.json(product)
        })
    })

}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                res.status(400).json({
                    error: "Unable to get the all Products"
                })
            }
            res.json(products)
        })
}


exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to fetch the category"
            })
        }
        res.json(category)
    })
}



exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } }
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation failed.."
            })
        }
        next()
    })


}
