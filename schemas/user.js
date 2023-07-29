const { Schema, model } = require("mongoose");
const Joi = require("joi");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionTypes = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionTypes,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const User = model("user", userSchema);

const userSchemaAuth = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const userSchemaSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
});

const schemas = {
  userSchemaAuth,
  userSchemaSubscription,
};

module.exports = { User, schemas };
