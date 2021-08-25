module.exports = (objRep) => {
    return (req, res, next) => {
        const Model = res.locals.Model;
        const newPics = req.files.map((file) => {
            let newPic = new objRep.Models['pictures']();
            if (req.body[file.originalname]) {
                newPic.caption = req.body[file.originalname];
            }
            newPic.base64 = file.buffer.toString('base64');
            return newPic;
        })
        Model.updateOne({ _id: res.locals.document._id }, { $addToSet: { pics: { $each: newPics } } }).exec((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ updated: res.locals.document, result });
        })
    }
}