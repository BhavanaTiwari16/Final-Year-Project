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
            body("firstName").notEmpty().withMessage("First name required"),
            body("lastName").notEmpty().withMessage("Last name required"),
            body("role").notEmpty().isIn(["USER","AUTHOR","DOCTOR"]).withMessage("Role must be USER, AUTHOR or DOCTOR"),
            body("stage").optional({ nullable:true, checkFalsy:true }),
            body("password").notEmpty().isLength({min:6}).withMessage("Password must be at least 6 characters"),
            body("ph_no").notEmpty().isNumeric().isLength({min:10,max:10}).withMessage("Valid 10-digit phone number required"),
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