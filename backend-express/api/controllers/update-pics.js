module.exports = (objRep) => {
    return (req, res, next) => {
        if (typeof req.body == 'undefined' || typeof req.body.caption == 'undefined') {
            return res.status(400).json({ saved: false, error: 'Request data missing. Caption is required' });
        }

        const Model = res.locals.Model;

        Model.updateOne({ _id: res.locals.document._id, 'pics._id': req.params.picid }, { $set: { 'pics.$.caption': req.body.caption } }).exec((err, result) => {
            if (err) {
               return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ updated: res.locals.document, result });
        })
    }
}