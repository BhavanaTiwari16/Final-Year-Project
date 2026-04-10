import { body } from "express-validator";

export class AuthValidator{
    public static signup(){
        return body("email").isEmail().withMessage("Invalid email")
    }
    public static verify() {
        return [
        body("email").isEmail().withMessage("Valid email required"),
        body("otp")
            .notEmpty().withMessage("OTP required")
            .isLength({ min: 4, max: 6 })
        ];
    }
    public static register(){
        return [
            body("email").isEmail().withMessage("Valid email required"),
            body("name").notEmpty().withMessage("Name Required"),
            body("password").notEmpty().isLength({min:6}).withMessage("Password must be at least 6 characters"),
            body("ph_no").notEmpty().isNumeric().isLength({min:10,max:10}).withMessage("Valid Phone Number Required"),
        ]
    }
    public static login(){
        return[
            body("email").isEmail().withMessage("Valid email required"),
             body("password").notEmpty().isLength({min:6}).withMessage("Password must be at least 6 characters")
        ]
    }

    public static resetPass(){
        return[
            body("newPassword").notEmpty().isLength({min:6}).withMessage("Password must be at least 6 characters")
        ]
    }
}