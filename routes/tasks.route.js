const express = require("express");

const router = express.Router();

const verifyjwt = require("../middleware/verity.jwt")
const tasksController = require("../controllers/tasks.controller")
const {createTaskValidator, updateTaskValidator} = require("../middleware/validator")
const checkValidation = require("../middleware/checkValidation")


router.route("/")
          .post(verifyjwt,createTaskValidator,checkValidation, tasksController.createTask)

router.route("/")
          .get(verifyjwt,tasksController.getTasks)

router.route("/:taskId")
           .patch(verifyjwt,updateTaskValidator,checkValidation,tasksController.updateTask)
    
router.route("/:taskId")
            .delete(verifyjwt,tasksController.deleteTask)
 
module.exports = router