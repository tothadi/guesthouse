module.exports = (objRep) => {
    const { Models } = objRep;
    return (req, res, next) => {
        const Model = Models[req.params.model];
        return Model.findOne({ _id: req.params.id }).exec((err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!result) {
                return res.status(404).json({ message: `No document with the id: ${req.params.id} can be found.` });
            }
            res.locals.document = result;
            res.locals.Model = Model;
            return next();
        })
    }
}