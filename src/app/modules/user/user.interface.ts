export enum Role {
    ADMIN = "ADMIN",
    RIDER = "RIDER",
    DRIVER = "DRIVER"
}

export enum Availability {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IVehicle {
    type: "car" | "cng" | "bike" | "auto";
    model: string;
    plateNum: string;
    // passengerCapacity: number; 
}

export interface IAuthProvider{
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
    behicleInfo?: IVehicle;
}