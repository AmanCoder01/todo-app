import { validationResult } from "express-validator";
import { User } from "../models/user.models.js"
import jsonGenerate from "../utils/helpers.js";
import Jwt from "jsonwebtoken";
import { JWT_SECRET_TOKEN, statusCode } from "../utils/constants.js"

const RegisterController = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.json(jsonGenerate(statusCode.UNPROCCESSABLE_ENTRY, "User already exists"));
        }

        try {
            const user = await User.create({
                firstName,
                lastName,
                email: email.toLowerCase(),
                password,
            })

            const token = Jwt.sign({ userId: user._id }, JWT_SECRET_TOKEN);

            return res.json(jsonGenerate(statusCode.SUCCESS, "Registered  successfully! Please login to continue.", { userId: user._id, token: token }));

        } catch (er) {
            console.log(er);
        }
    }

    return res.json(jsonGenerate(statusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
};

export default RegisterController;