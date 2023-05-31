const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shopSchema = new Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
})

module.exports = mongoose.model('Shop', shopSchema, 'shop')
