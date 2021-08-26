module.exports = () => {
    return (req, res, next) => {
        // edit res.locals.newModel before save
        return next();
    }
}