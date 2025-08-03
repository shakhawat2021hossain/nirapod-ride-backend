import { Types } from "mongoose";
import { Role } from "../user/user.interface";

export enum RideStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  PICKED_UP = "picked_up",
  IN_TRANSIT = "in_transit",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IRide {
    rider: Types.ObjectId;
    driver?: Types.ObjectId;
    startLocation: string;
    endLocation: string;
    fare: number;
    status?: RideStatus;
    isCancelled?: boolean;
    cancelledBy?: Role;
    cancelReason?: string;
    requestedAt?: Date;
    acceptedAt?: Date;
    pickedUpAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;

}