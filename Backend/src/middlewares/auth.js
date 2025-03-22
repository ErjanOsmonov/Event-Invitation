const guestService = require('../services/index');

const checkAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Not authorized');
  }

  try {
    const userId = await guestService.checkToken(token);
    req.userId = userId;
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
};

module.exports = checkAuth;