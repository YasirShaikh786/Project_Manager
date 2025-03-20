import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import nodemailer from "nodemailer";
import {google }from 'googleapis';
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


export const sendVerificationEmail = async (email, verificationToken) => {
 
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          type: "OAuth2",
          user: "yasirshaikhpune@gmail.com ",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
      },
    });

    const mailOptions = {
        from: "ProTracker  <yasirshaikhpune@gmail.com>",
        to: email,
        subject: "Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace(
            "{verificationCode}",
            verificationToken
        ),
    };

    const result = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", result);
    } catch (error) {
    console.error("Error sending email:", error);
  }
};



export const sendPasswordResetEmail = async (email, resetURL) => {
 
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          type: "OAuth2",
          user: "yasirshaikhpune@gmail.com",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
      },
    });

    const mailOptions = {
        from: "ProTracker  <yasirshaikhpune@gmail.com>",
        to: email,
        subject: "Password Reset",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    };

    const result = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", result);
    } catch (error) {
    console.error("Error sending email:", error);
  }
  
};

export const sendResetSuccessEmail = async (email) => {

  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          type: "OAuth2",
          user: "yasirshaikhpune@gmail.com ",
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
      },
    });

    const mailOptions = {
        from: "ProTracker  <yasirshaikhpune@gmail.com>",
        to: email,
         subject: "Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    const result = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", result);
    } catch (error) {
    console.error("Error sending email:", error);
  }

};
