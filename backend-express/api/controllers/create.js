module.exports = (objRep) => {
    const { Models } = objRep;
    return (req, res, next) => {
        const Model = Models[req.params.model];
        const newModel = new Model(req.body);
        newModel.save(function (err, ) {
            if (err) {
                res.status(500).json({ saved: false, error: err.message });
                return
            }
            res.status(200).json({ saved: true, doc: newModel });
        });
    }
}