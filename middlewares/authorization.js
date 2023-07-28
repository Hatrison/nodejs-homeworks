const jwt = require("jsonwebtoken");
const { User } = require("../schemas/user");

const { SECRET_KEY } = process.env;

const authorization = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    next({ status: 401, message: "Not authorized" });
  }
};

module.exports = authorization;
