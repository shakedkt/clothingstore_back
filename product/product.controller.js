const productService = require('./product.service')
async function getProductById(req, res) {

    const productId = req.params.id
    const product = await productService.getProductById(productId)

    res.status(200).json({
        messeage: "Succes",
        product: product
    })
}

async function getProducts(req, res) {
    const filter = req.query.filter
    const products = await productService.query(filter)

    res.status(200).json({
        messeage: "Succes",
        products: products
    })
}

module.exports = {
    getProductById,
    getProducts,
}
