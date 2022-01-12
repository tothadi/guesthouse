const { ObjectId } = require("mongodb");

module.exports = (objRep) => {
  return async (req, res, next) => {
    const Model = res.locals.Model;
    const { bucket } = objRep;
    const picId = req.params.fileName.split('_')[1];
    const fileId = req.params.fileName.split('_')[2].split('.')[0];

    try {
      const doc = await Model.findByIdAndUpdate(
        { _id: res.locals.document._id },
        { $pull: { pics: { _id: picId } } },
        { new: true }
      );
      bucket.delete(new ObjectId(fileId));
      return res.json(doc);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
};
