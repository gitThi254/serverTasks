const CustomError = require("../Utils/CustomError");
const asyncHandlerError = require("../Utils/asyncHandlerError");
const jwt = require("jsonwebtoken");

const authRequired = asyncHandlerError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new CustomError("You are not logged in!", 401));
  jwt.verify(token, process.env.SECRET_JWT, async (err, user) => {
    if (err)
      return next(
        new CustomeError(
          "Invalid token or token expired, you are loggin again!",
          401
        )
      );
    req.user = user;
    next();
  });
});

module.exports = authRequired;
