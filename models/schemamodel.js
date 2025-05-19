const mongoose = require('mongoose')
const validator = require('validator')
const roal = require('../utility/rols')

const schema = mongoose.Schema({
    email: {
        type:String, 
        require:true,
        validator:[validator.isEmail, 'email exsist'],
        unique: true
    },
    password: {
        type:String, 
        require:true,
    },
    token: {
        type:String, 
        require:true,
    },
    avatar:{
        type:String, 
    },
    role:{
        type:String,
        enum:[roal.admin, roal.manger, roal.user],
        default:roal.user
    }
})

module.exports = mongoose.model('mongoose', schema)