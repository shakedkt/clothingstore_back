const dbService = require('../service/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filter) {
    
    const collection = await dbService.getCollection('newStyle')
    try {

        if (filter === '') {
            const products = collection.find().toArray()
            return products
        }
        const products = collection.find({ "subCategory": filter }).toArray()
        return products
    }
    catch (err) {
        console.log('Error: cannot find product');
        throw err
    }
}

async function getProductById(id) {
    const collection = await dbService.getCollection('newStyle')
    try {
        const product = collection.findOne({ "_id": ObjectId(id) })
        return product
    } catch (err) {
        console.log(error);
        throw err
    }
}

module.exports = {
    query,
    getProductById
}