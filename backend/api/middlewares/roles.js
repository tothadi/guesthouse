module.exports = () => {
    return (req, res, next) => {
        if (!req.payload.role.includes('godmode')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        return next();
    }
}