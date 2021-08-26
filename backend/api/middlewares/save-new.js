module.exports = () => {
    return (req, res, next) => {
        return res.locals.newModel.save((err, document) => {
            if (err) {
                const status = err.message.includes('validation') ? 400 : 500;
                return res.status(status).json({ error: err.message });
            }
            return res.json(document);
        });
    }
}