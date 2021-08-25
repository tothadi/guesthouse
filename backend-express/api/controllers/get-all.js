module.exports = (objRep) => {
    const { Models } = objRep;
    return (req, res, next) => {
        const Model = Models[req.params.model];
        Model.find({}).exec((err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json(result);
        })
    }
}