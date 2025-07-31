import { model, Schema } from "mongoose";
import { IRide } from "./ride.interface";

const rideSchema = new Schema<IRide>({
    rider: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    fare: { type: Number, required: true },
    isCancelled: { type: Boolean, default: false },
    cancelledBy: { type: String, enum: ["rider", "driver", "admin"] },
    cancelReason: { type: String },
    status: {
        type: String,
        enum: ["requested", "accepted", "picked_up", "in_transit", "completed", "cancelled"],
        default: "requested",
    },
    requestedAt: Date,
    acceptedAt: Date,
    pickedUpAt: Date,
    completedAt: Date,
    cancelledAt: Date

},
    {
        timestamps: true
    })

export const Ride = model("Ride", rideSchema)