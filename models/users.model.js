const mongoose = require("mongoose");

const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "failed must be an valid email address"],
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }, 
  avatar: {
    type: String,
    defaut: null
  }

}); 

module.exports = mongoose.model("User", userSchema);
