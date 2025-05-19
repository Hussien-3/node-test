const express = require('express')
const control = require('../controller/control')
const {validator} = require('../middleware/body')
const verifyHeader = require('../middleware/verify')
const upload = require('../middleware/multer')
const router = express.Router()
const allowto = require('../middleware/allowto')
const roal = require('../utility/rols')


router.route('/')
            .get(verifyHeader, allowto(roal.admin, roal.manger), control.getalluser)
            .post(validator(), upload.single('avatar'), control.register)

router.route('/login')
            .post(validator(), control.login)

    module.exports = router 