const express = require('express');
const { is } = require('express/lib/request');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

const router = express.Router()
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth')


router.route("/order/new").post(isAuthenticatedUser, newOrder)

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder)
router.route("/orders/me").get(isAuthenticatedUser, myOrders)

router.route("/admin/order/:id").put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder).delete(isAuthenticatedUser,authorizedRoles("admin"), deleteOrder)
router.route('/admin/orders').get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders)



module.exports = router;

