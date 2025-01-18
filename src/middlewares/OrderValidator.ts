import { body, query } from "express-validator";
import { PaymentMethod } from "../types/types";

export const validateCreateOrder = [
    body("image_id").notEmpty().withMessage("image_id is required"),
    body("customer_email").isEmail().withMessage("Valid email address is required"),
    body("payment_method")
        .custom((value) => Object.values(PaymentMethod).includes(value))
        .withMessage(`Invalid payment method. Allowed values are: ${Object.values(PaymentMethod).join(", ")}`),
];

export const validateGetOrders = [
    query("customerEmail")
        .optional() // Make the field optional
        .isEmail()
        .withMessage("Invalid email format"),

    query("createdAt")
        .optional()
        .isISO8601()
        .toDate() // Automatically convert to a Date object
        .withMessage("Invalid date format. Use ISO 8601 format (e.g., YYYY-MM-DD)"),

    query("paymentMethod")
        .optional()
        .custom((value) => Object.values(PaymentMethod).includes(value))
        .withMessage(
            `Invalid filter for payment method. Allowed values are: ${Object.values(PaymentMethod).join(", ")}`
        ),

    query("imageId")
        .optional()
        .isInt({ min: 1 }) // Validate that it's a non-negative integer
        .withMessage("Image ID must be a valid number"),
];