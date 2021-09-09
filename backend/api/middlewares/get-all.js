module.exports = (objRep) => {
    const { Models } = objRep;
    return async (req, res, next) => {
        const Model = Models[req.params.model];
        try {
            const docs = await Model.find({});
            return res.json(docs);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}