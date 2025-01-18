import { query, param } from "express-validator";


// generated with ChatGPT
export const validateSatelliteImageFilters = [
    // acquisitionDate must be a valid ISO 8601 date
    query("acquisitionDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("Invalid date format. Use ISO 8601 format (e.g., YYYY-MM-DD)"),

    // offNadir must be a number between 0 and 90
    query("offNadir")
        .optional()
        .isFloat({ min: 0, max: 90 })
        .withMessage("offNadir must be a number between 0 and 90"),

    // resolution must be a positive number
    query("resolution")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Resolution must be a positive number"),

    // minCloudCoverage must be a percentage between 0 and 100
    query("minCloudCoverage")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("minCloudCoverage must be a percentage between 0 and 100"),

    // maxCloudCoverage must be a percentage between 0 and 100
    query("maxCloudCoverage")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("maxCloudCoverage must be a percentage between 0 and 100"),

    // sensor must be a non-empty string
    query("sensor")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Sensor must be a non-empty string"),

    // scanDirection must be a non-empty string
    query("scanDirection")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Scan direction must be a non-empty string"),

    // satelliteElevation must be a positive number
    query("satelliteElevation")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Satellite elevation must be a positive number"),

    // imageBands must be a non-empty string
    query("imageBands")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Image bands must be a non-empty string"),

    // bbox must be a valid bounding box format (e.g., "minX,minY,maxX,maxY")
    query("bbox")
        .optional()
        .matches(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/)
        .withMessage("BBox must be in the format 'minX,minY,maxX,maxY' with valid coordinates"),
];

// generated with ChatGPT
export const validateId = [
    param("id")
        .exists()
        .withMessage("ID is required")
        .bail() // Stop validation if the ID is missing
        .isInt({ min: 0 })
        .withMessage("ID must be a positive integer"),
];
