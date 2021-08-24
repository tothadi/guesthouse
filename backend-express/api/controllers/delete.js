module.exports = (objRep) => {
    return (req, res, next) => {
        const Model = res.locals.Model;
        Model.deleteOne({ _id: res.locals.document._id }).exec(function (err, result) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({deleted: res.locals.document});
        })
    }
}