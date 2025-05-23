const SignUpUser = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user controller
exports.registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log(req.body)

  try {
    // Existing user check
    let user = await SignUpUser.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new SignUpUser({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ message: "User registered", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// login user controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

