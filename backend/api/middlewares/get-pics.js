const { ObjectId } = require('mongodb');

module.exports = (objRep) => {
    const { bucket } = objRep;
    return async (req, res, next) => {
        
        try {
            const fileId = req.params.fileName.split('_')[2].split('.')[0];
            var photoId = new ObjectId(fileId);
        } catch (err) {
            return res.status(400).json({ message: "Invalid PhotoID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" });
        }

        let downloadStream = bucket.openDownloadStream(photoId);

        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

        downloadStream.on('error', () => {
            res.sendStatus(404);
        });

        downloadStream.on('end', () => {
            res.end();
        });
    };
};