const { body  } = require("express-validator");

const registerValidator =  [  
    body("firstName" )
         .notEmpty()
         .withMessage("the firstName is lrequired"),
    body( "lastName" )
         .notEmpty()
         .withMessage("the lastName is lrequired"),
    body("email")
         .notEmpty()
         .withMessage("email required")
         .isEmail()
         .withMessage("must be an valid email address"),
    body("password")
         .notEmpty()
         .withMessage("password required")
         .isLength({min: 3})
         .withMessage("at least two characters")
]

const loginValidator = [
    body("email")
         .notEmpty()
         .withMessage("email required")
         .isEmail()
         .withMessage("must be an valid email address"),
    body("password")
         .notEmpty()
         .withMessage("password  required")
         .isLength({min: 3})
         .withMessage("at least two characters")
]

const createTaskValidator = [
     body("title")
          .trim()
          .notEmpty()
          .withMessage("title is required"),
     body("description")
          .notEmpty()
          .withMessage("description is required"),
]

const updateTaskValidator = [
     body("title")
          .optional()
          .trim()
          .notEmpty()
          .withMessage("title is required"),
     body("description")
          .optional()
          .notEmpty()
          .withMessage("description is required"),
     body("status")
          .optional()
          .isIn(["pending", "completed"])
          .withMessage("status must be pending or compleled")
]
module.exports = {
    registerValidator,
    loginValidator,
    createTaskValidator,
    updateTaskValidator
}
