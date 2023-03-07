import { expressjwt as jwt } from "express-jwt";
import dotenv from 'dotenv';
dotenv.config();

const isAuthenticated = jwt({
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
    requestProperty:'payload',
    getToken:getTokenFromHeaders
});

function getTokenFromHeaders(req) { 
    if(req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const token = req.headers.authorization.split(" ")[1];
        return token;
    }

    return null;
};

export {
    isAuthenticated
}