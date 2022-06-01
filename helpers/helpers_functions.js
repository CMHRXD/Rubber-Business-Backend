import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const idGenerator = () => Date.now().toString(32) + Math.random().toString(32).substring(2);
export const JWTGenerator = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export const confirmationEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        por: process.env.Email_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { email, name, token } = data;

    const info = await transport.sendMail({
        from: "AG - Administrador de Gomeria",
        to: email,
        subject: "Comprueba tu cuenta en AG",
        text: "Comprueba tu cuenta en AG",

        html: `<p>Hola ${name}, comprueba tu cuenta en AG.</p>
                <p>Tu cuenta ya esta lista, solo debes comrpobarla en el siguente enlace:
                        <a href="${process.env.FRONTEND_URL}/confirmAccount/${token}">Comprobar Ahora</a>
                </p>
                <p>Si no has creado esta cuenta ignora el msg</p>
        `

    })
}
export const PasswordEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        por: process.env.Email_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { email, name, token } = data;

    const info = await transport.sendMail({
        from: "AG - Administrador de Gomeria",
        to: email,
        subject: "Recuperar Contraseña",
        text: "Recuperar Contraseña",

        html: `<p>Hola ${name}, recupera tu contraseña en AG.</p>
                <p>Tu cuenta ya esta lista, solo debes comprpobarla en el siguente enlace:
                        <a href="${process.env.FRONTEND_URL}/ForgotPassword/${token}">Comprobar Ahora</a>
                </p>
                <p>Si no has creado esta cuenta ignora el msg</p>
        `

    })
}

export const dateFormat = (date) => {
    const newDate = new Date(date);
    let month = '' + (newDate.getMonth() + 1);
    let day = '' + newDate.getDate();
    let year = newDate.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return `${day}-${month}-${year}`;
}
