const bcrypt = require("bcrypt");
const { object, string } = require("yup");
const { User } = require("../../models/User");

const createUser = async (req, res) => {
  try {
    const validationSchema = object({
      name: string().required(),
      email: string().email().required(),
      password: string().required(),
    });

    await validationSchema.validate(req.body);
  } catch (error) {
    return res.status(400).json({ error: error?.message });
  }

  try {
    const { name, email, password } = req.body;

    const existedUser = await User.where({ email: email }).findOne();
    if (existedUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { id } = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ id, name, email });
  } catch (error) {
    return res.status(500).json({ error: "Unexpected Error" });
  }
};

module.exports = { createUser };
