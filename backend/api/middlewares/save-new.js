const { sendEmail } = require("../../services/mailer");

module.exports = () => {
  return async (req, res, next) => {
    try {
      const doc = await res.locals.newModel.save();

      if (req.params.model === 'reservations') {
        const confirmResult = await sendEmail(doc.email, doc.name, 'savedReservation', doc);
        const notificationResult = await sendEmail(process.env.MAILER_REPLY_TO, 'doc.name', 'reservationNotification', doc);
        console.log(notificationResult);
        return res.status(200).json({...doc, emailResult: { success: confirmResult.accepted.length > 0 } });
      }

      return res.json(doc);
    } catch (err) {
      const status = err.message.includes('validation') ? 400 : 500;
      return res.status(status).json({ error: err.message });
    }
  };
};
