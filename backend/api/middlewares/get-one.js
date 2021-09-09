module.exports = (objRep) => {
  const { Models } = objRep;
  return async (req, res, next) => {
    const Model = Models[req.params.model];
    try {
      const doc = await Model.findOne({ _id: req.params.id });
      res.locals.document = doc;
      res.locals.Model = Model;
      return next();
    } catch (err) {
      const status = err.message.includes('validation') ? 400 : 500;
      return res.status(status).json({ error: err.message });
    }
  };
};
