const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const {
  schemas: { userSchemaAuth },
} = require("../../schemas/user");
const { User } = require("../../schemas/user");

const register = async (req, res) => {
  const response = userSchemaAuth.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .json({ message: response.error?.details[0].message });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = register;
