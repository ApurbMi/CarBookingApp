const jwt = require('jsonwebtoken');
const sendResponse = require('../Utilites/error.utilite');

const authCheck = (req, res, next) => {
  let token = req.get('Authorization');

  if (!token || !token.startsWith("Bearer ")) {
    return next(sendResponse(401, 'Token not found or invalid'));
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded;
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = authCheck;
