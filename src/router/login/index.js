const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { object, string } = require("yup");
const { User } = require("../../models/User");

const login = async (req, res) => {
  try {
    const validationSchema = object({
      email: string().email().required(),
      password: string().required(),
    });

    await validationSchema.validate(req.body);
  } catch (error) {
    return res.status(400).json({ error: error?.message });
  }

  try {
    const { email, password } = req.body;

    const foundUser = await User.where({ email: email }).findOne();
    if (!foundUser) {
      return res.status(401).json({ error: "User or password is invalid" });
    }

    const isValidPassword = await bcrypt.compare(password, foundUser.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "User or password is invalid" });
    }

    const token = jwt.sign(
      { id: foundUser.id, name: foundUser.name, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res
      .status(201)
      .json({ id: foundUser.id, name: foundUser.name, email, token });
  } catch (error) {
    return res.status(500).json({ error: "Unexpected Error" });
  }
};

module.exports = { login };
