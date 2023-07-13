const { getPlaces } = require('../controllers/openAiController')

const router = require('express').Router()

router.post('/getplaces',getPlaces)

module.exports = router