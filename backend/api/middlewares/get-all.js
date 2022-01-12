module.exports = () => {
    return async (req, res, next) => {
        const Model = res.locals.models[req.params.model];
        try {
            const docs = await Model.find({});
            if (Object.keys(Model.schema.paths).includes('order')) {
                docs.sort((a,b)=> a-b);
            }
            return res.json(docs);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}