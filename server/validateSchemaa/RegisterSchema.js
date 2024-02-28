import { check } from "express-validator";

 const RegisterSchema = [
    check('firstName','First Name is required').exists().isLength({min:3,max:100}).withMessage("First Name is required").trim(),
    check('email',"Email is required").exists().isEmail(),
    check('password','Password is Required').exists().isLength({min:6,max:100}).withMessage("Password must be greater than 6 characters").trim(),
]

export default RegisterSchema;