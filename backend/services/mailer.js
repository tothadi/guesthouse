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

function createHtml(name, type, reservation) {
    const table = `
        <table>
            <tbody>
                <tr>
                    <td>Azonosító:</td>
                    <td>${reservation?._id}</td>
                </tr>
                <tr>
                    <td>Név:</td>
                    <td>${reservation?.name}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>${reservation?.email}</td>
                </tr>
                <tr>
                    <td>Telefonszám:</td>
                    <td>${reservation?.phone}</td>
                </tr>
                <tr>
                    <td>Megjegyzés:</td>
                    <td>${reservation?.comment}</td>
                </tr>
                <tr>
                    <td>Érkezés:</td>
                    <td>${reservation?.arrivalAt?.toLocaleDateString()}</td>
                </tr>
                <tr>
                    <td>Távozás:</td>
                    <td>${reservation?.leaveAt?.toLocaleDateString()}</td>
                </tr>
            </tbody>
        </table>
    `
    const types = {
        confirmReservation: `
            <h1>Kedves ${name}!</h1>
            <p>Az oldalunkon új foglalási igényt adott le.</p>
            <p>Kérjük, hogy a foglalását erősítse meg az alábbi linkre kattintva!</p>
            <br/>
            <a href="${reservation}" style="text-decoration: none;">Megerősítem</a>
            <br/>
            <br/>
            Üdvözlettel,
            <br/>
            <br/>
            Könczevölgyi Vendégház
        `,
        savedReservation: `
            <h1>Kedves ${name}!</h1>
            <p>Foglalását az alábbi adatokkal mentettük.</p>
            <p>Hamarosan felvesszük Önnel a kapcsolatot.</p>
            <br/>
            ${table}
            <br/>
            Üdvözlettel,
            <br/>
            <br/>
            Könczevölgyi Vendégház
        `,
        reservationNotification: `
            <h2>Rendszerüzenet</h1>
            <p>Új foglalás érkezett az alábbi adatokkal.</p>
            <br/>
            <br/>
            ${table}
        `,
    };

    return types[type];
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
