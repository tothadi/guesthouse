module.exports = () => {
  return async (req, res, next) => {
    if (typeof req.body == 'undefined') {
      return res
        .status(400)
        .json({ saved: false, error: 'Request data missing.' });
    }
    delete req.body.updatedAt;
    const Model = res.locals.Model;
    
    try {
      const doc = await Model.findByIdAndUpdate(
        { _id: res.locals.document._id },
        { $set: req.body },
        { new: true }
      );
      return res.json(doc);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
};
