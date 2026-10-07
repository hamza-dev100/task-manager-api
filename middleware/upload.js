const multer = require("multer")
const path = require("path")

const storge =  multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename:  (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, `avatar-${req.user._id}-${Date.now()}${ext}`)


    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image"))
        cb(null, true)
    else cb(new Error("only images allowed", false))

}

module.exports = multer({storage: storge, fileFilter})

