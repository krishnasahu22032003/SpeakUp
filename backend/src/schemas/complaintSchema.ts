import { z } from "zod";

export const CreateComplaintSchema = z
  .object({
   complaintId: z.string().optional(),

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
image: z.array(z.string().url()).optional() ,

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

export const UserUpdateComplaintSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters")
    .trim()
    .optional(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description too long")
    .trim()
    .optional(),

  type: z
    .enum(["EMERGENCY", "NON_EMERGENCY"])
    .optional(),

  location: z
    .string()
    .min(3, "Location too short")
    .max(255, "Location too long")
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

  image: z.array(z.string().url()).optional(),

})
.strict()
.refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update",
});

export const AdminupdateComplaintSchema = z.object({
  status: z.enum([
    "PENDING",
    "IN_PROGRESS",
    "RESOLVED",
    "DISMISSED",
  ]),
  updatedAt: z.string().datetime(),
});