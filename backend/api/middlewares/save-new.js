module.exports = () => {
  return async (req, res, next) => {
    try {
      const doc = await res.locals.newModel.save();
      return res.json(doc);
    } catch (err) {
      const status = err.message.includes('validation') ? 400 : 500;
      return res.status(status).json({ error: err.message });
    }
  };
};
