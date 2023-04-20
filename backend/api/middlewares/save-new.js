const { sendEmail } = require("../../services/mailer");

module.exports = () => {
  return async (req, res, next) => {
    try {
      const doc = await res.locals.newModel.save();
      // TODO: send email about confirmation if model is reservations
      if (model === 'reservations') {
        // const emailResult = sendEmail(doc.email, 'confirmReservation', 'https://konczevolgyivendeghaz.hu');
      }
      
      return res.json(doc);
    } catch (err) {
      const status = err.message.includes('validation') ? 400 : 500;
      return res.status(status).json({ error: err.message });
    }
  };
};
