const { sendEmail } = require("../../services");
const {
  schemas: { userSchemaVerify },
  User,
} = require("../../schemas/user");

const { BASE_URL } = process.env;

const resendVerify = async (req, res) => {
  const response = userSchemaVerify.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required field email" });
  }

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  if (user.verify) {
    return res
      .status(401)
      .json({ message: "Verification has already been passed" });
  }

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerify;
