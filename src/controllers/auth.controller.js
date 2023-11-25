const CustomError = require("../Utils/CustomError");
const asyncHandlerError = require("../Utils/asyncHandlerError");
const createAccessToken = require("../libs/jwt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const checkLogin = (req) => {
  const { token } = req.cookies;
  if (token) return false;
  return false;
};

exports.signup = asyncHandlerError(async (req, res, next) => {
  const newUser = await User.create(req.body);
  newUser.save();
  res.sendStatus(201);
});

exports.login = asyncHandlerError(async (req, res, next) => {
  if (!checkLogin(req))
    return next(new CustomError("you are already logged in", 400));
  const userLogin = await User.findOne({ email: req.body.email });
  console.log(await userLogin.comparePW(req.body.password));
  if (!userLogin || !(await userLogin.comparePW(req.body.password))) {
    return next(new CustomError("Incorrect in Email or Passwrd", 401));
  }
  const token = await createAccessToken({ id: userLogin._id });
  res.cookie("token", token);
  res.json({
    data: {
      username: userLogin.username,
      email: userLogin.email,
    },
  });
});

exports.logout = asyncHandlerError(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.sendStatus(200);
});

exports.verifyToken = asyncHandlerError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new CustomError("You are not logged in", 401));
  jwt.verify(token, process.env.SECRET_JWT, async (err, token) => {
    if (err)
      return next(
        new CustomError(
          "Invalid token or Expires Token, You are logged again",
          401
        )
      );
    const userFound = await User.findById(token.id);
    if (!userFound) return next(new CustomError("Username not found", 400));
    res.json({
      username: userFound.username,
      email: userFound.email,
    });
  });
});
