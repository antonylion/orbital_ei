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
}

export enum PaymentMethod {
    BankTransfer = "Bank Transfer",
    CreditCard = "Credit Card",
    PayPal = "PayPal",
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