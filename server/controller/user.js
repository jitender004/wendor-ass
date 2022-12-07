const USERMODEL = require("../model/User");
const bcrypt = require("bcrypt");

module.exports.Register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const CheckName = await USERMODEL.findOne({ name });
    if (CheckName) {
      return res.json({ msg: "Username already exists", status: false });
    }
    const emailCheck = await USERMODEL.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "email already exists", status: false });
    }
    const hashpassword = await bcrypt.hash(password, 8);
    const user = await USERMODEL.create({
      name,
      email,
      phone,
      password: hashpassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await USERMODEL.findOne({ email });
    if (!user) {
      return res.json({
        msg: "Incorrect Email address or password",
        status: false,
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.json({ msg: "Incorrect Password", status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
