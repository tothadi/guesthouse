module.exports = (objRep) => {
    const { Models } = objRep;
    return (req, res, next) => {
        if (!Object.keys(Models).includes(req.params.model)) {
            return res.status(400).json({ error: 'Route not existing!' });
        }
        return next();
    }
}