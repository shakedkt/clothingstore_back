const productService = require('./product.service')
console.log('got here');

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
    const lol = ''
    const products = await productService.query(lol)

    res.status(200).json({
        messeage: "Succes",
        products: products
    })

}

module.exports = {
    getProductById,
    getProducts,
}
