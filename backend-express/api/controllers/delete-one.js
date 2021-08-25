module.exports = (objRep) => {
    return (req, res, next) => {
        const Model = res.locals.Model;
        Model.deleteOne({ _id: res.locals.document._id }).exec((err, result) => {
            if (err) {
               return res.status(500).json({ error: err.message });
            }
            res.status(200).json({deleted: res.locals.document, result});
        })
    }
}