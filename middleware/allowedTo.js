const appError = require("./appError")
const httpStatusText = require("../utils/httpStatusText")
module.exports = (...roles ) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            const error = appError.create("this role is not authorized", httpStatusText.FAIL, 403)
            return next(error)
        }
        next()
    }
}