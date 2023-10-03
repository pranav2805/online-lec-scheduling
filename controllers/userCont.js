const User = require("../models/user");
const jwt = require("jsonwebtoken");

function isStringInvalid(string) {
  if (string == undefined || string.length === 0) return true;
  return false;
}

function generateToken(id, name, isAdmin) {
  return jwt.sign({ id, name, isAdmin }, "qwerty");
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (isStringInvalid(username) || isStringInvalid(password)) {
      return res
        .status(400)
        .json({ err: "bad parameter. something is missing!" });
    }

    const user = await User.findOne({ where: { name: username } });

    if (user) {
      if (user.password === password) {
        res.status(200).json({
          success: true,
          message: "User logged in successfully",
          token: generateToken(user.id, user.name, user.isAdmin),
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
