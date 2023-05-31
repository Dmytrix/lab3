const Shop = require('../models/model_shop')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const shopData = {
    name: data.name,
    address: data.address,
    capacity: data.capacity,
  }

  return new Promise((resolve, reject) => {
    Shop.findByIdAndUpdate(
      data.id,
      { $set: shopData },
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
