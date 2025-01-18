export interface SatelliteImage {
    catalogID: number;
    acquisitionDateStart: Date;
    acquisitionDateEnd: Date;
    offNadir: number;
    resolution: number;
    cloudCoverage: number;
    sensor: string;
    scanDirection: string;
    satelliteElevation: number;
    imageBands: string;
    geometry: GeoJSON.Polygon;
}

export interface SatelliteImageFilters {
    acquisitionDate?: Date;
    offNadir?: number;
    resolution?: number;
    minCloudCoverage?: number;
    maxCloudCoverage?: number;
    sensor?: string;
    scanDirection?: string;
    satelliteElevation?: number;
    imageBands?: string;
    bbox?: string;
}

export enum PaymentMethod {
    BankTransfer = "Bank Transfer",
    CreditCard = "Credit Card",
    PayPal = "PayPal",
}

export enum PostgresErrorCodes {
    UNIQUE_VIOLATION = '23505',
    FOREIGN_KEY_VIOLATION = '23503',
    NOT_NULL_VIOLATION = '23502',
  }

export interface Order {
    orderId: number;
    imageId: number;
    customerEmail: string;
    createdAt: Date;
    paymentMethod: PaymentMethod;
}

export interface OrderFilters {
    customerEmail?: string;
    createdAt?: Date;
    paymentMethod?: number;
    imageId?: number;
}