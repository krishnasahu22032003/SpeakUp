import ComplaintAPI from "../../api/ComplaintApi";

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

  return res.data;
}