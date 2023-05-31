const mongoose = require('mongoose')

const Schema = mongoose.Schema

const storeSchema = new Schema({
  shopId: { type: String, required: true, },
  capacity: { type: Number, required: true },
})

module.exports = mongoose.model('Store', storeSchema, 'store')
