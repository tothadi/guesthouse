module.exports = (objRep) => {
  return async (req, res, next) => {
    const Model = res.locals.Model;
    const newPics = req.files.map((file) => {
      const extStart = file.originalname.lastIndexOf('.');
      const ext = file.originalname.substring(extStart + 1).toLowerCase();
      const newPic = new objRep.Models['pictures']();

      if (req.body[file.originalname]) {
        newPic.caption = req.body[file.originalname];
      }

      newPic.data = file.buffer;
      newPic.contentType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
      return newPic;
    });

    try {
      const doc = await Model.findByIdAndUpdate(
        { _id: res.locals.document._id },
        {
          $addToSet: { pics: { $each: newPics } },
        },
        { new: true }
      );
      const uploaded = newPics.map(p => p._id);
      return res.json(uploaded);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
};
