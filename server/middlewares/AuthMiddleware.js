import { JWT_SECRET_TOKEN, statusCode } from "../utils/constants.js";
import jsonGenerate from "../utils/helpers.js";
import Jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) => {
    if (req.headers['auth'] === undefined) {
        return res.json(jsonGenerate(statusCode.AUTH_ERROR, "Access Denied"));
    }
    const token = req.headers['auth'];
    try {
        const decoded = Jwt.verify(token, JWT_SECRET_TOKEN);
        // console.log("decoded", decoded);

        req.userId = decoded.userId;

        return next();

    } catch (error) {
        return  res.json(jsonGenerate(statusCode.UNPROCCESSABLE_ENTRY, "Invalid Token"));
    }
}


export default AuthMiddleware;