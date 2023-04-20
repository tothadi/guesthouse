const { createTransport } = require('nodemailer');

function normaliseEmailAddress(emailAddress) {
    return emailAddress.trim().toLowerCase();
}

module.exports.normaliseEmailAddress = normaliseEmailAddress;

function isValidEmailAddress(emailAddress) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailAddress);
}

module.exports.isValidEmailAddress = isValidEmailAddress;

const transporter = createTransport({
    host: process.env.MAILER_HOST,
    port: parseInt(process.env.MAILER_PORT, 10),
    secureConnection: process.env.MAILER_SECURE,
});

function createHtml(name, type, link) {
    const types = {
        confirmReservation: `
            <p>Az oldalunkon új foglalási igényt adott le.</p>
            <p>Kérjük, hogy a foglalását erősítse meg az alábbi linkre kattintva!</p>
            <br/>
            <a href="${link}" style="text-decoration: none;">Megerősítem</a>
            <br/>
            <br/>
        `,
        savedReservation: `
            <p>Foglalását mentettük!</p>
            <p>Hamarosan felvesszük Önnel a kapcsolatot.</p>
            <br/>
            <br/>
        `
    }

    return `
        <h1>Kedves ${name}!</h1>
        ${types[type]}
        Üdvözlettel,
        <br/>
        <br/>
        Könczevölgyi Vendégház`;
}

async function sendEmail(email, name, type, link) {
    const result = await transporter.sendMail({
        to: email,
        from: `'Könczevölgyi Vendégház' ${process.env.MAILER_SENDER}`,
        replyTo: process.env.MAILER_REPLY_TO,
        subject: 'Foglalás megerősítése',
        html: createHtml(name, type, link),
    });

    return result;
}

module.exports.sendEmail = sendEmail;
