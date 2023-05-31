const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemInShopSchema = new Schema({
  shopId: { type: String, required: true },
  itemId: { type: String, required: true },
})

module.exports = mongoose.model('ItemInShop', itemInShopSchema, 'itemInShop')
