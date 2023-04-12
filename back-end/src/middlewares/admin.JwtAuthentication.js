const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/generate.token');

const tokenAdminAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  const { role } = req.body;

  if (role) {
    try {
      const verify = jwt.verify(authorization, SECRET);
      req.user = verify;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  } else next();
};

module.exports = {
  tokenAdminAuthorization,
};
