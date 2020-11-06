const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()
const passport = require('passport');
// localhost:5000/api/auth/login
router.post('/login', controller.login)

// localhost:5000/api/auth/register
router.post('/register', controller.register)

//localhost:5000/api/auth/
router.get('/', controller.getAllcities)



module.exports = router