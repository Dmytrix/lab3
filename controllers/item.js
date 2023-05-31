'use strict'

const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')

const itemListService = require('../services/item.all')
const itemCreateService = require('../services/item.create')
const itemUpdateService = require('../services/item.update')
const itemBuIdService = require('../services/item.byId')
const itemDeleteService = require('../services/item.delete')

function _getMockItem(id = null) {
  return {
    id: 666,
    name: '',
    contry: '',
  }
}

module.exports = {
  index(req, res) {
    res.render('pages/item/index')
  },
  async itemList(req, res) {
    try {
      const itemList = await itemListService()
      res.render('pages/item/list', {
        items: itemList,
      })
    } catch (error) {
      res.render('pages/item/list', {
        items: [],
        errors: [{ msg: error.message }],
      })
    }
  },
  createItemForm(req, res) {
    res.render('pages/item/add')
  },
  postCreateItem: [
    async (req, res) => {
      // const success = true
      const itemData = req.body
      const errors = validationResult(req)

      if (errors.isEmpty()) {
        try {
          const item = await itemCreateService(itemData)
          req.flash('info', `Item "${item.name}" is Added`)
          res.redirect('/item/list')
        } catch (error) {
          res.render('pages/item/add', {
            errors: [{ msg: error.message }],
          })
        }
      } else {
        res.render('pages/item/add', {
          errors: errors.array(),
        })
      }
    },
  ],
  async updateItemForm(req, res) {
    const entity = await itemBuIdService(req.params.id)

    res.render('pages/item/update', { item: entity })
  },
  async putUpdateItem(req, res) {
    const success = true
    const itemData = req.body
    const itemId = req.params.id
    const mockItem = _getMockItem(itemId)
    // const mockProduct = _getMockProduct(productData.id)

    if (success) {
      const updatedItem = await itemUpdateService({
        ...itemData,
        id: itemId,
      })
      req.flash('info', `Item "#${itemId} ${itemData.name}" is Updated`)
      res.redirect('/item/list')
    } else {
      res.render('pages/item/update', {
        item: mockItem,
        newItem: itemData,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
  async deleteItemFrom(req, res) {
    const entity = await itemBuIdService(req.params.id)

    res.render('pages/item/delete', { item: entity })
  },
  async deleteItem(req, res) {
    const success = true
    const itemData = req.body
    const itemId = req.params.id
    const mockItem = _getMockItem(itemId)

    if (success) {
      const deletedItem = await itemDeleteService({id: itemId})
      req.flash('info', `Item "#${itemId} ${mockItem.name}" is Deleted`)
      res.redirect('/item/list')
    } else {
      res.render('pages/item/delete', {
        item: mockItem,
        errors: [{ msg: 'Error Omg' }],
      })
    }
  },
}
