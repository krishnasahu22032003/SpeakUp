import { z } from "zod";

export const CreateComplaintSchema = z
  .object({
    complaintId: z
      .string()
      .min(3, "Complaint ID too short")
      .max(50, "Complaint ID too long")
      .regex(/^[a-zA-Z0-9-_]+$/, "Only alphanumeric, - and _ allowed"),

    title: z
      .string()
      .min(5, "Title too short")
      .max(150, "Title too long")
      .trim(),

    description: z
      .string()
      .min(10, "Description too short")
      .max(2000, "Description too long")
      .trim(),

    image: z
      .string()
      .url("Invalid image URL")
      .max(500)
      .optional(),

    type: z.enum(["EMERGENCY", "NON_EMERGENCY"]),

    location: z
      .string()
      .max(200, "Location too long")
      .trim()
      .optional(),

    latitude: z
      .number()
      .min(-90, "Invalid latitude")
      .max(90, "Invalid latitude")
      .optional(),

    longitude: z
      .number()
      .min(-180, "Invalid longitude")
      .max(180, "Invalid longitude")
      .optional(),
  })

  .refine(
    (data) =>
      (data.latitude !== undefined && data.longitude !== undefined) ||
      (data.latitude === undefined && data.longitude === undefined),
    {
      message: "Latitude and Longitude must be provided together",
      path: ["latitude"],
    }
  )

  .refine(
    (data) => {
      if (data.type === "NON_EMERGENCY") {
        return !!data.location;
      }
      return true;
    },
    {
      message: "Location is required for non-emergency complaints",
      path: ["location"],
    }
  );