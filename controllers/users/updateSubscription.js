const {
  schemas: { userSchemaSubscription },
  User,
} = require("../../schemas/user");

const updateSubscription = async (req, res) => {
  const response = userSchemaSubscription.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res
      .status(400)
      .json({ message: response.error?.details[0].message });
  }

  const { _id } = req.user;

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  res.status(200).json({ subscription: result.subscription });
};

module.exports = updateSubscription;
