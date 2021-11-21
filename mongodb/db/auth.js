const { User } = require("../models");
const { getToken, encryptPassword, comparePassword } = require("../../util");

const register = async (args) => {
  if (args.username === "" || args.password === "") {
    throw new Error("Invalid Username or Password");
  }
  const newUser = {
    username: args.username,
    password: await encryptPassword(args.password),
    permission: args.permission,
    token: undefined,
  };
  // Check conditions
  const user = await User.findOne({ username: args.username });
  if (user) {
    throw new Error("User Already Exists!");
  }
  try {
    const user = new User({ ...newUser });
    const res = await user.save();
    const token = getToken(res);
    await User.updateOne(
      { _id: res._id },
      {
        token: token,
      }
    );
    return { ...res, token };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
const login = async (args) => {
  try {
    const user = await User.findOne({ username: args.username });
    if (!user) {
      throw new Error("User does not exist");
    }
    const isMatch = await comparePassword(args.password, user.password);
    if (isMatch) {
      const token = getToken(user);
      await User.updateOne(
        { _id: user._id },
        {
          token: token,
        }
      );
      return { ...user, token };
    } else {
      throw new Error("Wrong Password!");
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  register,
  login,
};
