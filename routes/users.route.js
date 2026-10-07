const express = require("express");

const route = express.Router();
const upload = require("../middleware/upload")

const verifyjwt = require("../middleware/verity.jwt")
const usersController = require("../controllers/users.controller")
const {registerValidator, loginValidator} = require("../middleware/validator")
const checkValidation = require("../middleware/checkValidation")
const allowedTo = require("../middleware/allowedTo")


// get all users
route.route("/")
          .get(verifyjwt,allowedTo("admin"), usersController.getUsers)

// register
route.route("/register")
            .post(registerValidator,checkValidation,usersController.register)
 
            
            
// login
route.route("/login")
            .post(loginValidator,checkValidation,usersController.login)

route.route("/profile/avatar")
            .patch(verifyjwt, upload.single("avatar"), usersController.updateAvatar)

module.exports = route