export enum Role {
    ADMIN = "ADMIN",
    RIDER = "RIDER",
    DRIVER = "DRIVER"
}

export enum Availability {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}

export enum vehicleType {
    CAR = "CAR",
    BIKE = "BIKE",
    CNG = "BIKR",
    AUTO = "AUTO"
}

export interface IVehicle {
    type: vehicleType;
    model: string;
    plateNum: string;
    // passengerCapacity: number; 
}

export enum DriverRequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",

}

export interface IDriverRequest {
    status: DriverRequestStatus;
    vehicleInfo: IVehicle;
    requestedAt: Date;

}
export interface IAuthProvider {
    provider: "credentials" | "google";
    providerId: string
}

export interface IUser {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    role: Role;
    picture?: string;
    availability?: Availability;
    isDeleted?: boolean;
    auths?: IAuthProvider[];
    address?: string;
    isVerified?: boolean;
    isOnline?: boolean;
    isApproved?: boolean;
    driverRequest?: IDriverRequest;
}