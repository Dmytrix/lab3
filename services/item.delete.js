const Item = require('../models/model_item')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  return new Promise((resolve, reject) => {
    Item.findByIdAndDelete(data.id, function (err, deletedItem) {
      if (err) {
        reject(err)
      } else {
        resolve(deletedItem)
      }
    })
  })
}
