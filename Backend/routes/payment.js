const express = require('express')
const router = express.Router()
const {isAuthenticatedUser } = require('../middlewares/authenticate')
const { processPayment, sendApiKey } = require('../controllers/paymentController')


router.route('/payment/process').post(isAuthenticatedUser, processPayment)
router.route('/RazorAPI').get(sendApiKey)


module.exports = router