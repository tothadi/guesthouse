module.exports = (objRep) => {
  const { Models, Restricted } = objRep;
  return (req, res, next) => {
    if (
      !Object.keys(Models).includes(req.params.model) &&
      !Object.keys(Restricted).includes(req.params.model)
    ) {
      return res.status(400).json({ error: 'Route not existing!' });
    }
    if (Object.keys(Restricted).includes(req.params.model)) {
      res.locals.models = Restricted;
      return next();
    }
    res.locals.models = Models;
    return next();
  };
};
