const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  schemas: { userSchemaAuth },
} = require("../../schemas/user");
const { User } = require("../../schemas/user");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const response = userSchemaAuth.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .json({ message: response.error?.details[0].message });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = login;
