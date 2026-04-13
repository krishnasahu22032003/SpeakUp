import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { compressImage } from "../../utils/compressImage";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { CreateComplaint } from "../../lib/services/ComplaintService";
import { toast } from "sonner";

type Props = {
  onClose: () => void;
};

type FormState = {
  title: string;
  description: string;
  type: "NON_EMERGENCY" | "EMERGENCY";
  location: string;
  latitude: string;
  longitude: string;
  images: File[];
};

const MAX_IMAGES = 5;

export default function DashboardComplaintModal({ onClose }: Props) {
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
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImages = async (files: FileList) => {
    const fileArray = Array.from(files);

    if (form.images.length + fileArray.length > MAX_IMAGES) {
      toast.error(`Max ${MAX_IMAGES} images allowed`);
      return;
    }

    const validFiles = fileArray.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files allowed");
        return false;
      }
      return true;
    });

    const compressed = await Promise.all(
      validFiles.map((file) => compressImage(file))
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

      const imageUrls = await uploadImages(form.images);

      const payload = {
        title: form.title,
        description: form.description,
        type: form.type,
        location: form.location || undefined,
        latitude: form.latitude ? Number(form.latitude) : undefined,
        longitude: form.longitude ? Number(form.longitude) : undefined,
        image: imageUrls,
      };

      await CreateComplaint(payload);

      toast.success("Complaint submitted successfully 🎉");
      onClose();

    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-3 sm:px-4">

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xl"
      />

      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[var(--bg-glass)] border border-[var(--border-subtle)] shadow-[var(--shadow-strong)] backdrop-blur-2xl p-5 sm:p-6 md:p-8"
      >

        <div className="absolute inset-0 pointer-events-none rounded-2xl">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-[var(--accent-core)] opacity-20 blur-3xl rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[var(--accent-calm)] opacity-20 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-[var(--text-primary)]">
              Raise Complaint
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Report an issue quickly from your dashboard
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition cursor-pointer "
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Complaint title"
            className="md:col-span-2 h-12 px-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the issue..."
            className="md:col-span-2 px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] resize-none"
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

          <div className="md:col-span-2 space-y-4">

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
              className="flex flex-col items-center justify-center h-28 border border-dashed border-[var(--border-subtle)] rounded-[var(--radius-md)] cursor-pointer hover:border-[var(--accent-core)] transition"
            >
              <span className="text-sm text-[var(--text-secondary)]">
                Click to upload images
              </span>
            </label>

            {form.images.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {form.images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      className="h-24 w-full object-cover rounded-xl"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/70 text-white text-xs cursor-pointer"
                    >
                    <X className="w-5 h-5 cursor-pointer" />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 h-12 rounded-[var(--radius-md)] bg-[var(--accent-core)] text-white font-medium transition hover:shadow-lg hover:shadow-[var(--accent-core)]/30"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

      </div>
    </div>
  );
}