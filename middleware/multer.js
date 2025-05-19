const multer = require('multer')
const apperror = require('../utility/apperror')

const diskStorge = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName)
    }
})

const upload = multer({ storage: diskStorge,
    fileFilter:function (req, file, cb) {
        const img = file.mimetype.split('/')[0]
        
        if (img == 'imag' || img == 'image') {
            return cb(null, true)
        } else{
            return cb(apperror.creat('invald ext, ext must by img', 400), false)
        }
    }
})

    module.exports = upload
