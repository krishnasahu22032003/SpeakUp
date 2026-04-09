import ENV from "./ENV";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "Complaint-preset");

  const res = await fetch(
   ENV.CLOUDINARY , 
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  return data.secure_url;
};