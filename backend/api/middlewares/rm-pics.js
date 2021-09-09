module.exports = (objRep) => {
  return async (req, res, next) => {
    const Model = res.locals.Model;
    try {
      const doc = await Model.findByIdAndUpdate(
        { _id: res.locals.document._id },
        { $pull: { pics: { _id: req.params.picid } } },
        { new: true }
      );
      return res.json(doc);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
};
