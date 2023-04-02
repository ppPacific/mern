const express = require('express')

const {createSheet, getSheets, getSheet, deleteSheet, updateSheet} = require("../controllers/sheetController");
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();
//require auth for all sheet routes
router.use(requireAuth)
router.get('/', getSheets)

router.get('/:id', getSheet)

router.post('/', createSheet)
    //res.json({mssg: 'POST a new'})

router.delete('/:id',deleteSheet)

router.patch('/:id',updateSheet)
module.exports = router