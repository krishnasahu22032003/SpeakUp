import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { X } from "lucide-react";
import { compressImage } from "../../utils/compressImage";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { CreateComplaint, UpdateUserComplaint } from "../../lib/services/ComplaintService";
import { toast } from "sonner";
import Button from "./Button";

type Props = {
  onClose: () => void;
  onSuccess?: (complaint: any) => void;
    initialData?: any;
};
type ComplaintType = "EMERGENCY" | "NON_EMERGENCY";

type FormState = {
  title: string;
  description: string;
  type: ComplaintType;
  location: string;
  latitude: string;
  longitude: string;
  images: File[];
};
const MAX_IMAGES = 5;

export default function ComplaintModal({ onClose , onSuccess , initialData }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

 
const [form, setForm] = useState<FormState>({
  title: "",
  description: "",
  type: "NON_EMERGENCY",
  location: "",
  latitude: "",
  longitude: "",
  images: [],
});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }

    document.body.style.overflow = "hidden";
    return () => {(document.body.style.overflow = "auto")}
  }, []);

  useEffect(() => {
  if (initialData) {
    setForm({
      title: initialData.title || "",
      description: initialData.description || "",
      type: initialData.type || "NON_EMERGENCY",
      location: initialData.location || "",
      latitude: initialData.latitude?.toString() || "",
      longitude: initialData.longitude?.toString() || "",
      images: [],
    });
  }
}, [initialData]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImages = async (files: FileList) => {
    const fileArray = Array.from(files);

    if (form.images.length + fileArray.length > MAX_IMAGES) {
      toast.error(`Max ${MAX_IMAGES} images allowed`);
      return;
    }

    const compressed = await Promise.all(
      fileArray.map((file) => compressImage(file))
    );

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...compressed],
    }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const uploadImages = async (files: File[]) => {
    return Promise.all(files.map((file) => uploadToCloudinary(file)));
  };

const handleSubmit = async () => {
  if (!form.title || !form.description) {
    toast.error("Title and Description are required");
    return;
  }

  try {
    setLoading(true);

    let imageUrls: string[] = [];

    // upload only if new images selected
    if (form.images.length > 0) {
      imageUrls = await uploadImages(form.images);
    }

    let res;

    if (initialData) {
      res = await UpdateUserComplaint(initialData.id, {
        title: form.title,
        description: form.description,
        type: form.type,
        location: form.location || undefined,
        latitude: form.latitude ? Number(form.latitude) : undefined,
        longitude: form.longitude ? Number(form.longitude) : undefined,
        ...(imageUrls.length > 0 && { image: imageUrls }),
      });

      toast.success("Complaint updated successfully ✨");

    } else {
      res = await CreateComplaint({
        title: form.title,
        description: form.description,
        type: form.type,
        location: form.location || undefined,
        latitude: form.latitude ? Number(form.latitude) : undefined,
        longitude: form.longitude ? Number(form.longitude) : undefined,
        image: imageUrls,
      });

      toast.success("Complaint submitted 🎉");
    }

    onSuccess?.(res);

    onClose();

  } catch (err: any) {
    toast.error(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-3 sm:px-6">
      
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
      />

      <div
        ref={modalRef}
        className="
          relative z-10 w-full max-w-4xl
          max-h-[90vh] overflow-y-auto

          bg-[var(--bg-glass)]
          border border-[var(--border-subtle)]
          rounded-[var(--radius-lg)]
          shadow-[var(--shadow-strong)]
          backdrop-blur-2xl

          px-5 sm:px-8 py-6 sm:py-8
        "
      >
        <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] opacity-40 blur-[100px]" />

        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[var(--accent-core)] opacity-20 blur-[140px] rounded-full" />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[22px] sm:text-[26px] font-semibold text-[var(--text-primary)]">
              File a Complaint
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Share your concern securely
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition"
          >
           <X className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-5">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Complaint title"
            className="sm:col-span-2 h-12 px-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Describe the issue..."
            className="sm:col-span-2 px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] resize-none"
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="h-12 px-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
          >
            <option value="NON_EMERGENCY">Non Emergency</option>
            <option value="EMERGENCY">Emergency</option>
          </select>

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="h-12 px-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
          />

          <input
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            placeholder="Latitude"
            className="h-12 px-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
          />

          <input
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            placeholder="Longitude"
            className="h-12 px-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
          />

          <div className="sm:col-span-2 space-y-4">
            <input
              id="upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleImages(e.target.files)}
            />

            <label
              htmlFor="upload"
              className="
                flex flex-col items-center justify-center
                h-28 rounded-[var(--radius-md)]
                border border-dashed border-[var(--border-subtle)]
                cursor-pointer transition

                hover:border-[var(--accent-core)]
                hover:bg-[var(--bg-elevated)]
              "
            >
              <span className="text-sm text-[var(--text-secondary)]">
                Upload images
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                Max {MAX_IMAGES}
              </span>
            </label>

            {form.images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {form.images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      className="h-24 w-full object-cover rounded-[12px]"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/70 text-white text-xs"
                    >
                     <X className="w-4 h-4 cursor-pointer" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
          className="w-full h-12 mt-6"
        >
          Submit Complaint
        </Button>
      </div>
    </div>
  );
}