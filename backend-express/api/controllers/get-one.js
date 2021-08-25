module.exports = (objRep) => {
    const { Models } = objRep;
    return (req, res, next) => {
        const Model = Models[req.params.model];
        Model.findOne({ _id: req.params.id }).exec((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.locals.document = result;
            res.locals.Model = Model;
            return next();
        })
    }
}