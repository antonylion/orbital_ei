export interface SatelliteImage {
    catalogID: string;
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
    paymentMenthod: PaymentMethod;
}