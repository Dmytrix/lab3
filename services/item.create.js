const Item = require('../models/model_item')

/**
 * @param {Object} data
 */
module.exports = function (data) {
  const item = new Item({
    name: data.name,
    contry: data.contry,
  })

  return new Promise((resolve, reject) => {
    item.save(function (err, createdItem) {
      if (err) {
        reject(err)
      } else {
        resolve(createdItem)
      }
    })
  })
}
