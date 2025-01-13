import { body } from "express-validator";
import { PaymentMethod } from "../types";

export const validateCreateOrder = [
    body("image_id").notEmpty().withMessage("image_id is required"),
    body("customer_email").notEmpty().withMessage("customer_email is required")
                          .isEmail().withMessage("Valid email address is required"),
    body("payment_method")
        .custom((value) => Object.values(PaymentMethod).includes(value))
        .withMessage(`Invalid payment method. Allowed values are: ${Object.values(PaymentMethod).join(", ")}`),
];