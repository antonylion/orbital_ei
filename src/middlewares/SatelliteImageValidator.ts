import { query, param } from "express-validator";
import * as turf from "@turf/turf";
import { BBox } from "geojson";

/**
 * Validation rules for retrieving satellite images.
 * Validates query parameters for filtering satellite images.
 */
export const validateSatelliteImageFilters = [
    /** Validates that 'acquisitionDate' is an optional ISO 8601 date. */
    query("acquisitionDate")
        .optional()
        .isISO8601()
        .toDate()
        .withMessage("Invalid date format. Use ISO 8601 format (e.g., YYYY-MM-DD)"),

    /** Validates that 'offNadir' is an optional number between 0 and 90. */
    query("offNadir")
        .optional()
        .isFloat({ min: 0, max: 90 })
        .withMessage("offNadir must be a number between 0 and 90"),

    /** Validates that 'resolution' is an optional positive number. */
    query("resolution")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Resolution must be a positive number"),

    /** Validates that 'minCloudCoverage' is a percentage between 0 and 100. */
    query("minCloudCoverage")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("minCloudCoverage must be a percentage between 0 and 100"),

    /** Validates that 'maxCloudCoverage' is a percentage between 0 and 100. */
    query("maxCloudCoverage")
        .optional()
        .isFloat({ min: 0, max: 100 })
        .withMessage("maxCloudCoverage must be a percentage between 0 and 100"),

    /** Validates that 'sensor' is an optional, non-empty string. */
    query("sensor")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Sensor must be a non-empty string"),

    /** Validates that 'scanDirection' is an optional, non-empty string. */
    query("scanDirection")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Scan direction must be a non-empty string"),

    /** Validates that 'satelliteElevation' is an optional positive number. */
    query("satelliteElevation")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Satellite elevation must be a positive number"),

    /** Validates that 'imageBands' is an optional, non-empty string. */
    query("imageBands")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Image bands must be a non-empty string"),

    /** Validates that 'bbox' is a valid bounding box in the format "minX,minY,maxX,maxY". */
    query("bbox")
        .optional()
        .custom((value) => {
            const parts = value.split(",");
            if (parts.length !== 4) {
                throw new Error("BBox must have exactly 4 comma-separated values: minX,minY,maxX,maxY");
            }
            const [minX, minY, maxX, maxY] = parts.map(Number);
            const bbox: BBox = [minX, minY, maxX, maxY];

            try {
                const polygon = turf.bboxPolygon(bbox);
                if (minX >= maxX || minY >= maxY) {
                    throw new Error("BBox values must follow the order: minX < maxX and minY < maxY");
                }
                if (!polygon || polygon.geometry.type !== "Polygon") {
                    throw new Error("BBox did not generate a valid Polygon");
                }
            } catch (err) {
                throw new Error("Invalid BBox format or values: " + err.message);
            }
            return true;
        })
        .withMessage(
            "BBox must be in the format 'minX,minY,maxX,maxY' with valid coordinates: Longitude between -180 and 180, Latitude between -90 and 90"
        ),
];

/**
 * Validation rules for validating a parameter ID.
 * Ensures it exists and is a positive integer.
 */
export const validateId = [
    /** Validates that 'id' exists and is a positive integer. */
    param("id")
        .exists()
        .withMessage("ID is required")
        .bail()
        .isInt({ min: 0 })
        .withMessage("ID must be a positive integer"),
];