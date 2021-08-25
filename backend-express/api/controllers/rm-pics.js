module.exports = (objRep) => {
    return (req, res, next) => {
        const Model = res.locals.Model;
        Model.updateOne({ _id: res.locals.document._id }, { $set: req.body }).exec((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ updated: res.locals.document, result });
        })
    }
}