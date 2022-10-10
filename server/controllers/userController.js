const { ApiError, badRequest, internal } = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/Models");

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET, {
    expiresIn: "24h",
  });
};

const registor = async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    return next(badRequest("Password or Email is incorrect"));
  }
  const candidate = await User.findOne({ where: { email } });
  if (candidate) {
    return next(badRequest("User with this Email already exist"));
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ email, role, password: hashPassword });
  const basket = await Basket.create({ userId: user.id });
  const token = generateToken(user.id, user.email, user.role);
  return res.json({ token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(internal("You are not registered"));
  }
  let comparedPassword = bcrypt.compareSync(password, user.password);
  if (!comparedPassword) {
    return next(internal("Password is not matched"));
  }
  const token = generateToken(user.id, user.email, user.role);
  return res.json({ token });
};

const auth = async (req, res, next) => {
  const token = generateToken(req.user.id, req.user.email, req.user.role);
  return res.json({ token });
};

module.exports = { login, registor, auth };
