const Item = require('../models/model_item')

/**
 * @param {Object} data
 */
module.exports = function (id) {
  return new Promise((resolve, reject) => {
    Item.findById(id, function (err, item) {
      if (err) {
        reject(err)
      } else {
        resolve(item)
      }
    })
  })
}
