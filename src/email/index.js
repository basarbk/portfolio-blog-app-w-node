import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "cecile.skiles@ethereal.email",
    pass: "1D4XAbTk1xyKUWsath",
  },
});

export async function sendSignUpEmail(email, token) {
  await transporter.sendMail({
    from: "info@my-app.com",
    to: email,
    subject: "Finish creating your account on My App",
    html: `
    <h1>You are almost there</h1>
    <span>Click the link below to confirm your email and finish creating your My App account.</span>
    <div>
    <a href="http://localhost:5173/callback?token=${token}&operation=register">Create your account</a>
    </div>
    `,
  });
}
