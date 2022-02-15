const userController = require('../controllers/userController');
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndUserAuthorization,
    isLoggedIn
} = require("../controllers/verifyToken");
const router = require('express').Router()

router.get('/', isLoggedIn, verifyToken, userController.getAllUser)
router.delete('/:id', isLoggedIn, verifyTokenAndUserAuthorization, userController.deleteUser)


module.exports = router;