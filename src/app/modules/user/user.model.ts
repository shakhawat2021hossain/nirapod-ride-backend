import { model, Schema } from "mongoose";
import {
  Availability,
  DriverRequestStatus,
  IAuthProvider,
  IDriverRequest,
  IUser,
  IVehicle,
  Role,
} from "./user.interface";


const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String },
    providerId: { type: String },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const vehicleSchema = new Schema<IVehicle>(
  {
    model: { type: String, required: true },
    type: {
      type: String,
      enum: ["car", "cng", "bike", "auto"],
      required: true,
    },
    plateNum: { type: String, required: true },
  },
  {
    versionKey: false,
    _id: false,
  }
);

const driverRequestSchema = new Schema<IDriverRequest>(
  {
    status: {
      type: String,
      enum: Object.values(DriverRequestStatus),
      default: DriverRequestStatus.PENDING,
    },
    vehicleInfo: vehicleSchema,
    requestedAt: { type: Date },
    approvedAt: { type: Date },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    _id: false,
    versionKey: false,
  }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.RIDER,
    },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    vehicleInfo: vehicleSchema,
    availability: {
      type: String,
      enum: Object.values(Availability),
      default: Availability.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    auths: [authProviderSchema],
    driverRequest: driverRequestSchema,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("User", userSchema);