import { body, query } from "express-validator";
import { PaymentMethod } from "../types/types";

/**
 * Validation rules for creating an order.
 * Ensures required fields are present and have valid values.
 * 
 * The following validation rules have been generated with the help of ChatGPT
 * 
 */
export const validateCreateOrder = [
    /** Ensures 'image_id' is provided and not empty. */
    body("image_id").notEmpty().withMessage("image_id is required"),
    /** Validates that 'customer_email' is a properly formatted email address. */
    body("customer_email").isEmail().withMessage("Valid email address is required"),
    /** Validates that 'payment_method' is one of the allowed PaymentMethod values. */
    body("payment_method")
        .custom((value) => Object.values(PaymentMethod).includes(value))
        .withMessage(`Invalid payment method. Allowed values are: ${Object.values(PaymentMethod).join(", ")}`),
];

/**
 * Validation rules for retrieving orders.
 * Validates query parameters for filtering orders.
 */
export const validateGetOrders = [
    /** Validates 'customerEmail' if provided, ensuring it is a properly formatted email address. */
    query("customerEmail")
        .optional()
        .isEmail()
        .withMessage("Invalid email format"),

    /** Validates 'createdAt' if provided, ensuring it is in ISO 8601 date format and converts it to a Date object. */
    query("createdAt")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("Invalid date format. Use ISO 8601 format (e.g., YYYY-MM-DD)"),

    /** Validates 'paymentMethod' if provided, ensuring it matches one of the allowed PaymentMethod values. */
    query("paymentMethod")
        .optional()
        .custom((value) => Object.values(PaymentMethod).includes(value))
        .withMessage(`Invalid filter for payment method. Allowed values are: ${Object.values(PaymentMethod).join(", ")}`),

    /** Validates 'imageId' if provided, ensuring it is a positive integer. */
    query("imageId")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Image ID must be a valid number"),
];