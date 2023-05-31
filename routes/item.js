'use strict'

const express = require('express')
const router = express.Router()

const itemController = require('../controllers/item')

router.get('/', itemController.index)
router.get('/list', itemController.itemList)
router.get('/add', itemController.createItemForm)
router.post('/add', itemController.postCreateItem)
router.get('/edit/:id', itemController.updateItemForm)
router.post('/edit/:id', itemController.putUpdateItem)
router.get('/remove/:id', itemController.deleteItemFrom)
router.post('/remove/:id', itemController.deleteItem)

module.exports = router
