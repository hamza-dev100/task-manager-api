const bcrypt = require("bcrypt");

const User = require("../models/users.model");
const generateToken = require("../utils/generateToken");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../middleware/appError");

// -----get all users----
const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({}, { __v: false });
  return res.json({ status: httpStatusText.SUCCESS, data: { users } });
});

// ------register-----
const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const OldUser = await User.findOne({ email });
  if (OldUser) {
    const error = appError.create(
      "user already exists",
      httpStatusText.FAIL,
      404,
    );
    return next(error);
  }

  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  // generate JWT token
    await generateToken({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });


  await newUser.save();

  newUser.password = undefined;
  newUser.__v = undefined;
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: newUser } });
});

//  -----login----
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = appError.create(
      "email and password are required",
      httpStatusText.FAIL,
      401,
    );
    return next(error);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = appError.create("user not fount", httpStatusText.FAIL, 404);
    return next(error);
  }
  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    const token = await generateToken({
      email: user.email,
      id: user._id,
      role: user.role,
    });
    return res.json({ status: httpStatusText.SUCCESS, data: { token } });
  } else {
    const error = appError.create("something wrong", httpStatusText.ERROR, 400);
    return next(error);
  }
});

// profile
const updateAvatar = asyncWrapper(async (req, res) => {
  if(!req.file){
    const error = appError.create("avatar is required", httpStatusText.FAIL, 400)
    return next(error)
  }
  const avatarPath = req.file.path.replace(/\\/g, "/");
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatarPath },
    { new: true },
  ).select("-__v -password");
  res.json({ status: httpStatusText.SUCCESS, data: user });
})

module.exports = {
  getUsers,
  register,
  login,
  updateAvatar,
};
