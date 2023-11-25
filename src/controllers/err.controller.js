const CustomError = require("../Utils/CustomError");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode ?? 500;
  if (err.code === 11000)
    err = new CustomError(
      "Email address exists, please use another email!",
      400
    );
  res.status(err.statusCode).json([err.message]);
};
