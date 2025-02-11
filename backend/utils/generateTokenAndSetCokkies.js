import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, user_id) => {
    const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {   //receives user_id and JWT_SECRET from .env using process.env variable and assigns it to token with JWT secret
        expiresIn: "7d",    //token expires in 7 day
    })
    res.cookie("token", token, {                                    //sends token in cookie to function call in auth_controller 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expires in 7 day
    });
    return token;
}   