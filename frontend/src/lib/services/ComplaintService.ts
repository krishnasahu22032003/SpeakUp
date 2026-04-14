import ComplaintAPI from "../../api/ComplaintApi";

type CreateComplaintPayload = {
  title: string;
  description: string;
  location?: string;
  longitude?: number;
  latitude?: number;
  type: "EMERGENCY" | "NON_EMERGENCY";
  image?: string[];
};

type Complaint = {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "DISMISSED";
  createdAt: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  image?: string[];
};

export async function CreateComplaint(data: CreateComplaintPayload) {
  return ComplaintAPI<{ success: boolean; message: string; data: any }>(
    "create",
    
    {
      headers: {
            "Content-Type": "application/json"
        },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};

export async function GetUserComplaints(page = 1, limit = 6) {
  const res = await ComplaintAPI<{
    success: boolean;
    data: any[];
  }>(`user-complaints?page=${page}&limit=${limit}`, {
    method: "GET",
  });

  return res.data;
};

export async function UpdateUserComplaint(id: string, payload: any) {
  const res = await ComplaintAPI<{
    success: boolean;
    data: any;
  }>(`user/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return res.data;
};
