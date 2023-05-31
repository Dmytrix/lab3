const Item = require('../models/model_item')

/**
 * @param {Object} data
 */
module.exports = function () {
  return new Promise((resolve, reject) => {
    Item.find()
      .exec(function (err, items) {
        if (err) {
          reject(err)
        } else {
          resolve(items)
        }
      })
  })
}
