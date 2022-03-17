const express = require('express');
const { is } = require('express/lib/request');
const { newOrder, getSingleOrder, myOrders } = require('../controllers/orderController');

const router = express.Router()
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth')


router.route("/order/new").post(isAuthenticatedUser, newOrder)

router.route("/order/:id").get(isAuthenticatedUser, authorizedRoles("admin"), getSingleOrder)
router.route("/orders/me").get(isAuthenticatedUser, myOrders)



module.exports = router;

