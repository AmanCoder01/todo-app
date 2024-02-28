import { validationResult } from "express-validator";
import { statusCode, JWT_SECRET_TOKEN } from "../utils/constants.js";
import jsonGenerate from "../utils/helpers.js";
import Jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";


const LoginController = async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json(jsonGenerate(statusCode.UNPROCCESSABLE_ENTRY, 'User not found'));
        }

         const isPassword = await user.isPasswordCorrect(password);
         if (!isPassword) {
             return res.json(jsonGenerate(statusCode.UNPROCCESSABLE_ENTRY, 'Wrong Password'));
         }

        const token = Jwt.sign({ userId: user._id }, JWT_SECRET_TOKEN);

        return res.json(jsonGenerate(statusCode.SUCCESS, "Welcome , You are logged in !", { userId: user._id, token: token }));
    }

    return res.json(jsonGenerate(statusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
};

export default LoginController;