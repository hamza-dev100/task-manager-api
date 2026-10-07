module.exports = (asyncFa) => {
    return (req, res, next) => {
        asyncFa(req, res, next)
        .catch((error) => {
            return next(error)
            
        })
    }
}