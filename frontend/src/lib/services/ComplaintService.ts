import ComplaintAPI from "../../api/ComplaintApi";

type CreateComplaintPayload = {
  title: string;
  description: string;
  location?: string;
  longitude?: number;
  latitude?: number;
  type: "EMERGENCY" | "NON_EMERGENCY";
  image?: string;
};

export async function CreateComplaint(data: CreateComplaintPayload) {
  return ComplaintAPI<{ success: boolean; message: string; data: any }>(
    "/create",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}