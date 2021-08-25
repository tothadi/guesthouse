module.exports = (objRep) => {
    const { Models } = objRep;
    return (req, res, next) => {

        if (typeof req.body == 'undefined') {
            res.status(400).json({ saved: false, error: 'Request data missing.' });
            return;
        }

        const Model = Models[req.params.model];
        const newModel = new Model(req.body);

        newModel.save((err) => {
            if (err) {
                res.status(500).json({ saved: false, error: err.message });
                return;
            }
            res.status(200).json({ saved: true, doc: newModel });
        });
    }
}