/* eslint-disable no-unused-vars */
const express = require('express')

const router = express.Router()
const ConversationController = require('../controllers/ConversationController')
// eslint-disable-next-line func-names
module.exports = function routes(app) {
	app.use('/api', router)
	router.post('/start', ConversationController.start)
}
