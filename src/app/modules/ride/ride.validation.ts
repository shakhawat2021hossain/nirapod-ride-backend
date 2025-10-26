import z from "zod";

export const createRideZodSchema = z.object({
    startLocation: z
        .string({ invalid_type_error: "Start Location must be a string" })
        .min(1, "Start Location is required"),

    endLocation: z
        .string({ invalid_type_error: "End Location must be a string" })
        .min(1, "End Location is required"),

    fare: z
        .number({ invalid_type_error: "Fare must be a number" })
        .positive("Fare must be greater than zero"),
});
