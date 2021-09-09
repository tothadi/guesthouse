module.exports = (objRep) => {
  const { Restricted } = objRep;
  const User = Restricted['user'];
  return async (req, res, next) => {
    if (typeof req.body == 'undefined') {
      return res
        .status(400)
        .json({ saved: false, error: 'Request data missing.' });
    }

    const newUser = new User();
    const { salt, hash } = newUser.setPassword(req.body.password);

    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.fullname = req.body.fullname;
    newUser.role = req.body.role;
    newUser.salt = salt;
    newUser.hash = hash;

    try {
      const user = await newUser.save();
      const token = user.generateJwt(user);
      return res.json({ user, token });
    } catch (err) {
      const status = err.message.includes('validation') ? 400 : 500;
      return res.status(status).json({ error: err.message });
    }
  };
};
