const { sendEmail } = require('../../services/mailer');

module.exports = () => {
    return async (req, res, next) => {
        const {
            body,
            params: { model },
            path,
        } = req;

        if (typeof body === 'undefined') {
            return res.status(400).json({ error: 'Request data missing.' });
        }

        delete body._id;
        delete body.updatedAt;

        const Model = res.locals.models[model];

        if (model === 'reservations') {
            if (path.includes('confirmation')) {
                res.locals.newModel = new Model(req.newReservation);
                return next();
            }
            const possibleOverlaps = await Model.find({
                $and: [
                    { arrivalAt: { $lte: body.leaveAt } },
                    { leaveAt: { $gte: body.arrivalAt } },
                ],
            });

            if (possibleOverlaps.length > 0) {
                return res.status(400).send('Overlapping dates.');
            }

            const tempReservation = new Model(body);
            const jwt = tempReservation.generateJwt(body);
            const baseUrl = process.env.BASE_URL;
            const url = `${baseUrl}/megerosites?payload=${jwt}`;

            const result = await sendEmail(body.email, body.name, 'confirmReservation', url);
            return res.status(200).json(result);
        }
        res.locals.newModel = new Model(body);
        return next();
    };
};
