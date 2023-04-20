const { sendEmail } = require("../../services/mailer");

module.exports = () => {
  return async (req, res, next) => {
    try {
      const doc = await res.locals.newModel.save();

      if (req.params.model === 'reservations') {
        const emailResult = await sendEmail(doc.email, doc.name, 'savedReservation');
        // TODO: handle errors
        return res.status(200).json({...doc, emailResult: { success: true } });
      }

      return res.json(doc);
    } catch (err) {
      const status = err.message.includes('validation') ? 400 : 500;
      return res.status(status).json({ error: err.message });
    }
  };
};
