module.exports = (objRep) => {
    const { Models } = objRep;
    return (req, res, next) => {
        const Model = Models[req.params.model];
        return Model.find({}).exec((err, result) => {
            if (err) {
               return res.status(500).json({ error: err.message });
            }
            return res.json(result);
        })
    }
}