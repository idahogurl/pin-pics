import { User } from './db/models';

const processLogin = async function processLogin(req, res, next) {
  try {
    const { id, name, email } = req.body;

    let user = await User.findOne({ where: { id } });

    if (!user) {
      console.log('create it');
      user = await User.create({
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

export default processLogin;
