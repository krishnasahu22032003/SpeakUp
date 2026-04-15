import ComplaintAPI from "../../api/ComplaintApi";

type Complaint = {
  id: string;
  title: string;
  description: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  image?: string[];
};

export async function GetAdminComplaints(page = 1, limit = 10) {
  const res = await ComplaintAPI<{
    success: boolean;
    message: string;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    data: any[];
  }>(`admin-complaints?page=${page}&limit=${limit}`, {
    method: "GET",
  });

  return {
    complaints: res.data,
    page: res.page,
    total: res.total,
    totalPages: res.totalPages,
  };
}

export async function AdminUpdateComplaint(
  id: string,
  payload: {
    status: "PENDING" | "IN_PROGRESS" | "RESOLVED" | "DISMISSED";
    updatedAt: string;
  }
) {
  const res = await ComplaintAPI<{
    success: boolean;
    message: string;
    data: Complaint; // ✅ added
  }>(`admin/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return res;
}