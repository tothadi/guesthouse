module.exports = (objRep) => {
    return (req, res, next) => {
        if (typeof req.body == 'undefined' || typeof req.body.caption == 'undefined') {
            res.status(400).json({ saved: false, error: 'Request data missing. Caption is required' });
            return;
        }

        const Model = res.locals.Model;

        Model.updateOne({ _id: res.locals.document._id, 'pics._id': req.params.picid }, { $set: { 'pics.$.caption': req.body.caption } }).exec(function (err, result) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ updated: res.locals.document, result });
        })
    }
}