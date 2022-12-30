const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
//Register the Uses
router.post('/register',userCtrl.registerUser)
router.post('/login',userCtrl.loginUser)

router.get('/verify',userCtrl.verifiedToken)

module.exports = router