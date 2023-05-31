const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemInStoreSchema = new Schema({
  storeId: { type: String, required: true },
  itemId: { type: String, required: true },
})

module.exports = mongoose.model('ItemInStore', itemInStoreSchema, 'itemInStore')
