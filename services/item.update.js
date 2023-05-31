const Item = require('../models/model_item')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const itemData = {
    name: data.name,
    contry: data.contry,
  }

  return new Promise((resolve, reject) => {
    Item.findByIdAndUpdate(
      data.id,
      { $set: itemData },
      { new: true },
      function (err, updatedLocationType) {
        if (err) {
          reject(err)
        } else {
          resolve(updatedLocationType)
        }
      })
  })
}
