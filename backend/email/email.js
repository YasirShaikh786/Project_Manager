import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import nodemailer from "nodemailer";
import {google }from 'googleapis';

const CLIENT_ID = "70932678821-gj8vkj0bdekfpum9mrqa0shlt77cgu8k.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04Bg0FLMrQ6L2CgYIARAAGAQSNwF-L9Irnr-SP0ISv54ayPj7ciMPua3rEx9QU7_U2RxWUNkYRMiu55WBwy8l7dDjM9BHfpzJNJ4"

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
