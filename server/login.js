const models = require('./db/models');

module.exports = async function processLogin(req, res, next) {
  try {
    const { id, name, email } = req.body;

    let user = await models.User.findOne({ where: { id } });

    if (!user) {
      user = await models.User.create({
        id,
        fullName: name,
        email,
        screenName: email.substring(0, email.indexOf('@')),
      });
    }

    res.redirect(302, '/');
    next();
  } catch (err) {
    next(err);
  }
};
