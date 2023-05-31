const Shop = require('../models/model_shop')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  return new Promise((resolve, reject) => {
    Shop.findByIdAndDelete(data.id, function (err, deletedShop) {
      if (err) {
        reject(err)
      } else {
        resolve(deletedShop)
      }
    })
  })
}
