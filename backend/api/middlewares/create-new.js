module.exports = () => {
    return (req, res, next) => {
        if (typeof req.body == 'undefined') {
            return res.status(400).json({ error: 'Request data missing.' });
        }
        delete req.body._id;
        delete req.body.updatedAt;
        const Model = res.locals.models[req.params.model];
        res.locals.newModel = new Model(req.body);
        return next();
    }
}