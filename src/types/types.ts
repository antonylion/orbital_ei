/**
 * Represents metadata and details about a satellite image.
 */
export interface SatelliteImage {
    /** Unique identifier for the catalog entry. */
    catalogID: number;
    /** Start date of the image acquisition. */
    acquisitionDateStart: Date;
    /** End date of the image acquisition. */
    acquisitionDateEnd: Date;
    /** Off-nadir angle of the satellite when capturing the image. */
    offNadir: number;
    /** Resolution of the image in meters. */
    resolution: number;
    /** Cloud coverage percentage of the image. */
    cloudCoverage: number;
    /** Sensor used for capturing the image. */
    sensor: string;
    /** Scan direction of the satellite (e.g., North-to-South). */
    scanDirection: string;
    /** Elevation of the satellite when capturing the image. */
    satelliteElevation: number;
    /** Bands included in the image (e.g., RGB, Infrared). */
    imageBands: string;
    /** Geometric footprint of the image as a GeoJSON polygon. */
    geometry: GeoJSON.Polygon;
}

/**
 * Filters that can be applied when querying satellite images.
 */
export interface SatelliteImageFilters {
    /** Date of image acquisition. */
    acquisitionDate?: Date;
    /** Maximum off-nadir angle allowed. */
    offNadir?: number;
    /** Desired resolution in meters. */
    resolution?: number;
    /** Minimum acceptable cloud coverage percentage. */
    minCloudCoverage?: number;
    /** Maximum acceptable cloud coverage percentage. */
    maxCloudCoverage?: number;
    /** Sensor to filter by. */
    sensor?: string;
    /** Scan direction to filter by. */
    scanDirection?: string;
    /** Minimum satellite elevation allowed. */
    satelliteElevation?: number;
    /** Image bands to filter by (e.g., RGB, Infrared). */
    imageBands?: string;
    /** Bounding box to filter images within, as a string. */
    bbox?: string;
}

/**
 * Enum representing supported payment methods.
 */
export enum PaymentMethod {
    /** Payment via bank transfer. */
    BankTransfer = "Bank Transfer",
    /** Payment via credit card. */
    CreditCard = "Credit Card",
    /** Payment via PayPal. */
    PayPal = "PayPal",
}

/**
 * Represents a customer order for a satellite image.
 */
export interface Order {
    /** Unique identifier for the order. */
    orderId: number;
    /** ID of the associated satellite image. */
    imageId: number;
    /** Email address of the customer who placed the order. */
    customerEmail: string;
    /** Date and time when the order was created. */
    createdAt: Date;
    /** Payment method used for the order. */
    paymentMethod: PaymentMethod;
}

/**
 * Filters that can be applied when querying orders.
 */
export interface OrderFilters {
    /** Email address of the customer to filter by. */
    customerEmail?: string;
    /** Date when the order was created to filter by. */
    createdAt?: Date;
    /** Payment method ID to filter by. */
    paymentMethod?: number;
    /** Satellite image ID to filter by. */
    imageId?: number;
}