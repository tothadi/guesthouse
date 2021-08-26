module.exports = (objRep) => {
    return (req, res, next) => {
        const Model = res.locals.Model;
        return Model.deleteOne({ _id: res.locals.document._id }).exec((err, result) => {
            if (err) {
               return res.status(500).json({ error: err.message });
            }
            return res.json({deleted: res.locals.document, result});
        })
    }
}