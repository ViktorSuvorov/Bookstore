const { Router } = require('express');
const path = require('path');
const multer = require('multer');
const uploadRouter = Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null,'../src/public/uploads/')
    },
    filename(req,file,cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    },
})

function checkFileType(file,cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null,true)
    } else {
        cb('You should upload image');
    }
}
const upload = multer({
    storage,
    fileFilter:function(req,file,cb) {
        checkFileType(file,cb)
    }
})

uploadRouter.post('/', upload.single('image'), (req,res) => {
    let answer = (req.file.path);
    answer = answer.slice(13,answer.length);
    res.send(answer);
})

module.exports = uploadRouter;