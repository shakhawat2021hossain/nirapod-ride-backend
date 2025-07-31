import { Types } from "mongoose";

export interface IRide {
    rider: Types.ObjectId;
    driver?: Types.ObjectId;
    startLocation: string;
    endLocation: string;
    fare: number;
    status?: "requested" | "accepted" | "picked_up" | "in_transit" | "completed" | "cancelled";
    isCancelled?: boolean;
    cancelledBy?: "rider" | "driver" | "admin";
    cancelReason?: string;
    requestedAt?: Date;
    acceptedAt?: Date;
    pickedUpAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;

}