const models = require('./db/models');

/**
 * Authentication Middleware
 * Finds a user associated with a cookie.
 * If cookie does not * exist, the request is unauthenticated.
 */
const getUser = async function getUser(req, res, next) {
  if (req.signedCookies.token) {
    // cookie exists
    const [id] = req.signedCookies.token.split('|');
    const user = await models.User.findById(id);
    req.user = user;
  }

  next();
};

module.exports = (req, res, next) => {
  getUser(req, res, next).then(() => {}).catch(next);
};
