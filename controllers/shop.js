'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const shopListService = require('../services/shop.all')
const shopCreateService = require('../services/shop.create')
const shopUpdateService = require('./../services/shop.update')
const shopBuIdService = require('./../services/shop.byId')
const shopDeleteService = require('./../services/shop.delete')

const productListService = require('../services/product.all')
const productCreateService = require('../services/product.create')

function _getMockShop(id = null) {
  return {
    id: 666,
    name: '',
    address: 666,
    capacity: 666,
  }
}

module.exports = {
  index(req, res) {
    res.render('pages/shop/index')
  },
  async shopList(req, res) {
    try {
      const shopList = await shopListService()
      res.render('pages/shop/list', {
        shops: shopList,
      })
    } catch (error) {
      res.render('pages/shop/list', {
        shops: [],
        errors: [{ msg: error.message }],
      })
    }
  },
  createShopForm(req, res) {
    res.render('pages/shop/add')
  },
  postCreateShop: [
    // body('name')
    //   .isLength({ min: 1 }).trim().withMessage('Name field must be specified.'),
    // body('sku')
    //   .isLength({ min: 1 }).trim().withMessage('Code field must be specified.'),
    // sanitizeBody('name').escape(),
    // sanitizeBody('sku').escape(),
    async (req, res) => {
      // const success = true
      const shopData = req.body
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          const shop = await shopCreateService(shopData)
          req.flash('info', `Shop "${shop.name}" is Added`)
          res.redirect('/shop/list')
        } catch (error) {
          res.render('pages/shop/add', {
            errors: [{ msg: error.message }],
          })
        }
      } else {
        res.render('pages/shop/add', {
          errors: errors.array(),
        })
      }
    },
  ],
  async updateShopForm(req, res) {
    const entity = await shopBuIdService(req.params.id)

    res.render('pages/shop/update', { shop: entity })
  },
  async putUpdateShop(req, res) {
    const success = true
    const shopData = req.body
    const shopId = req.params.id
    const mockShop = _getMockShop(shopId)
    // const mockProduct = _getMockProduct(productData.id)

    if (success) {
      const updatedShop = await shopUpdateService({
        ...shopData,
        id: shopId,
      })
      req.flash('info', `Shop "#${shopId} ${shopData.name}" is Updated`)
      res.redirect('/shop/list')
    } else {
      res.render('pages/shop/update', {
        shop: mockShop,
        newShop: shopData,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
  async deleteShopFrom(req, res) {
    const entity = await shopBuIdService(req.params.id)

    // const mockShop = _getMockShop(req.params.id)
    res.render('pages/shop/delete', { shop: entity })
  },
  async deleteShop(req, res) {
    const success = true
    const shopData = req.body
    const shopId = req.params.id
    const mockShop = _getMockShop(shopId)

    if (success) {
      const deletedShop = await shopDeleteService({id: shopId})
      req.flash('info', `Shop "#${shopId} ${mockShop.name}" is Deleted`)
      res.redirect('/shop/list')
    } else {
      res.render('pages/shop/delete', {
        shop: mockShop,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
}
