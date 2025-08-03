import { Types } from "mongoose";

export enum Role {
    ADMIN = "ADMIN",
    RIDER = "RIDER",
    DRIVER = "DRIVER"
}

export enum Availability {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE"
}

export enum VehicleType {
    CAR = "car",
    BIKE = "bike",
    CNG = "cng",
    AUTO = "auto"
}

export interface IVehicle {
    type: VehicleType;
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
    approvedAt?: Date;
    approvedBy?: Types.ObjectId

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
    // isOnline?: boolean;
    isApproved?: boolean;
    driverRequest?: IDriverRequest;
    vehicleInfo?: IVehicle
}