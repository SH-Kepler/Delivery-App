const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/generate.token');

const tokenAuthorization = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const verify = jwt.verify(authorization, SECRET);
    req.user = verify;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  tokenAuthorization,
};
