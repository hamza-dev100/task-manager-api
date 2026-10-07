
const jwt = require("jsonwebtoken")
const User = require("../models/users.model")
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"]
    if(!authHeader){
        return res.status(400).json({msg: "token is required"})
    }

    const token = authHeader.split(" ")[1]
    if(!token){
       return res.status(400).json({msg: "token is required"}) 
    }

    try{
      const currentUser = jwt.verify(token, process.env.JWT_TOKEN_KEY) 
      const user = await User.findById(currentUser.id)
      req.user = user
      next()
    }catch(error){
        return res.status(401).json({msg: error.message})
    }
    

}
module.exports = verifyToken
