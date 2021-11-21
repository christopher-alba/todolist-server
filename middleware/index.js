const { User } = require("../mongodb/models");

const authenticate = async (req, res, next) => {
  const authObj = JSON.parse(req.headers.authorization);
  const user = await User.findOne({ username: authObj.username });
  if (authObj.token.valueOf() === user.token.valueOf()) return next();
  return res.status(401).send("Unauthenticated");
};

module.exports = { authenticate };
