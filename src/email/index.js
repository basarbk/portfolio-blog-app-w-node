import * as nodemailer from "nodemailer";
import config from "config";

const emailConfig = config.get("email");
const clientConfig = config.get("client");
const transporter = nodemailer.createTransport(emailConfig);

export async function sendSignUpEmail(email, token) {
  if (process.env.NODE_ENV === "development") {
    console.log({
      token,
      operation: "register",
    });
  }
  await transporter.sendMail({
    from: "info@my-app.com",
    to: email,
    subject: "Finish creating your account on My App",
    html: `
    <h1>You are almost there</h1>
    <span>Click the link below to confirm your email and finish creating your My App account.</span>
    <div>
    <a href="${clientConfig.host}/callback?token=${token}&operation=register">Create your account</a>
    </div>
    `,
  });
}

export async function sendLoginEmail(email, token) {
  if (process.env.NODE_ENV === "development") {
    console.log({
      token,
      operation: "login",
    });
  }
  await transporter.sendMail({
    from: "info@my-app.com",
    to: email,
    subject: "Sign in to My App",
    html: `
    <span>Click the link below to sign in to your My App account.</span>
    <div>
    <a href="${clientConfig.host}/callback?token=${token}&operation=login">Sign in to My App</a>
    </div>
    `,
  });
}
