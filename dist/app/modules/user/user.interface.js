"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRequestStatus = exports.VehicleType = exports.Availability = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["RIDER"] = "RIDER";
    Role["DRIVER"] = "DRIVER";
})(Role || (exports.Role = Role = {}));
var Availability;
(function (Availability) {
    Availability["ONLINE"] = "ONLINE";
    Availability["OFFLINE"] = "OFFLINE";
})(Availability || (exports.Availability = Availability = {}));
var VehicleType;
(function (VehicleType) {
    VehicleType["CAR"] = "car";
    VehicleType["BIKE"] = "bike";
    VehicleType["CNG"] = "cng";
    VehicleType["AUTO"] = "auto";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
var DriverRequestStatus;
(function (DriverRequestStatus) {
    DriverRequestStatus["PENDING"] = "pending";
    DriverRequestStatus["APPROVED"] = "approved";
    DriverRequestStatus["REJECTED"] = "rejected";
})(DriverRequestStatus || (exports.DriverRequestStatus = DriverRequestStatus = {}));
