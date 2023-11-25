const { Router } = require("express");
const {
  signup,
  login,
  logout,
  verifyToken,
} = require("../controllers/auth.controller");
const { signupSchema, loginSchema } = require("../schemas/auth.schema");
const validatorSchema = require("../middlewares/validator.middleware");

const router = Router();

router.post("/signup", validatorSchema(signupSchema), signup);
router.post("/signin", validatorSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);

module.exports = router;
