module.exports = () => {
  return async (req, res, next) => {
    const Model = res.locals.Model;
    try {
      const doc = await Model.deleteOne({ _id: res.locals.document._id });
      return res.json(doc);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
};
