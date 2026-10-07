const {validationResult} = require("express-validator")
const httpStatusText = require("../utils/httpStatusText")
const appError = require("../middleware/appError")

module.exports = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error = appError.create(errors.array(), httpStatusText.ERROR, 400)
        return next(error)
    }
    next()
    
}