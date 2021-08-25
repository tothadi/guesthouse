module.exports = (objRep) => {
    const { Models } = objRep;
    return (req, res, next) => {
        const Model = Models[req.params.model];
        Model.find({}).exec((err, result) => {
            if (err) {
               return res.status(500).json({ error: err.message });
            }
            res.status(200).json(result);
        })
    }
}