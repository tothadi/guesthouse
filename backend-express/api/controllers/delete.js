module.exports = (objRep) => {
    return (req, res, next) => {
        const Model = res.locals.Model;
        Model.deleteOne({ $set: res.locals.document }).exec(function (err, result) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json(result);
        })
    }
}