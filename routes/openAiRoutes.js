const { getPlaces, getItinerary } = require('../controllers/openAiController')

const router = require('express').Router()

router.post('/getplaces', getPlaces)
router.post('/getItinerary', getItinerary)

module.exports = router