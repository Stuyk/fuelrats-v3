export interface IVehicleData {
    displayName: string;
    manufacturer: string;
    price: number;
    weightKG: number;
    drivetrain: string;
    realMaxSpeedMPH: number;
    gameMaxSpeedKPH: number;
    model: string;
    hash: number;
    class: { id: number; name: string };
    seats: number;
    maxPassengers: number;
    inDealership: boolean;
    estimatedMaxSpeed: number;
    maxBraking: number;
    maxTraction: number;
    maxAcceleration: number;
}
