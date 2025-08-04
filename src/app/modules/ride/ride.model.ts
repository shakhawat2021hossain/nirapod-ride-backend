import { model, Schema } from "mongoose";
import { IRide, RideStatus } from "./ride.interface";

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
    status: {
        type: String,
        enum: Object.values(RideStatus),
        default: RideStatus.REQUESTED,
    },
    requestedAt: Date,
    acceptedAt: Date,
    pickedUpAt: Date,
    completedAt: Date,
    cancelledAt: Date

},
    {
        timestamps: true,
        // versionKey: false
    })

export const Ride = model("Ride", rideSchema)