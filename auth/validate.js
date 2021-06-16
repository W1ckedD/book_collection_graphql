const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: 'You must be logged in' });
    }
    const token = authorization.replace('Bearer ', '');
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(id);
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
