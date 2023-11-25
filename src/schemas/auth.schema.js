const { z } = require("zod");
exports.signupSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(6, { message: "username at least 4 character" }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid is Email" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "password at least 6 character" }),
});

exports.loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid is Email" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "password at least 6 character" }),
});
