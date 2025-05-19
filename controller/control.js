const User = require('../models/schemamodel')
const asyncHandler = require("express-async-handler") 
const jsend = require('../utility/statustext')
const {validationResult} = require('express-validator')
const apperror = require('../utility/apperror')
const bcrypt = require('bcrypt')
const validator = require('validator');
const jsonTokenHandler = require('../utility/jwt')

const getalluser = asyncHandler(
    async (req, res, next) => {

    const users = await User.find({}, {__v:false, token:false})

    res.json({status:jsend.success, data:{users}})
})


const register = asyncHandler(
    async (req, res, next) => {

    const error = validationResult(req)

    if (!error.isEmpty()) {
        const data = apperror.creat(error.array(), 404, jsend.fail)
        return next(data)
    }

    const {email, password, role} = req.body

    const eEmail = await validator.isEmail(email)

    if (!eEmail) {
        const data = apperror.creat('this not email', 404, jsend.fail)
        return next(data)
    }

    const hashed = await bcrypt.hash(password, 10)

    const findemail = await User.findOne({email:email})

    if (findemail) {
        const data = apperror.creat('email is arady exsist', 400, jsend.fail)
        return next(data)
    }

    const user = new User({
        email:email,
        password:hashed,
        role:role
    })

    const jsonWepToken = await jsonTokenHandler({email:user.email, _id:user._id, role:user.role})

    user.token = jsonWepToken

    await user.save()

    res.json({status:jsend.success, data:{user}})
})


const login = asyncHandler(
    async (req, res, next) => {

    const error = validationResult(req)

    if (!error.isEmpty()) {
        const data = apperror.creat(error.array(), 404, jsend.fail)
        return next(data)
    }

    const {email, password} = req.body

    const fEmail = await User.findOne({email:email})

    if (!fEmail) {
        const data = apperror.creat('email not found', 404, jsend.fail)
        return next(data)
    }

    const compare = await bcrypt.compare(password, fEmail.password)

    if (!compare) {
        const data = apperror.creat('password not match', 404, jsend.fail)
        return next(data)
    }

    if (fEmail && compare) {
        const jsonWepToken = await jsonTokenHandler({email:fEmail.email, _id:fEmail._id, role:fEmail.role})
        fEmail.token = jsonWepToken
        res.json({status:jsend.success, data:{user:fEmail, massage:'login sucsses'}})
    }
})


module.exports = {
    getalluser,
    register,
    login
}