import { useState, useEffect, useRef } from "react";
import { compressImage } from "../utils/compressImage";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { CreateComplaint } from "../lib/services/ComplaintService";
import gsap from "gsap";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

const ComplaintPage = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

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
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".c-heading", { y: 40, opacity: 0, duration: 1 })
        .from(".c-sub", { y: 30, opacity: 0, duration: 1 }, "-=0.6")
        .from(".c-field", { y: 30, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.6")
        .from(".c-upload", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".c-submit", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");

      gsap.to(".c-glow", {
        y: 50,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImages = async (files: FileList) => {
    const fileArray = Array.from(files) as File[];

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

    const compressedImages = await Promise.all(
      validFiles.map((file) => compressImage(file))
    );

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...compressedImages],
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
        image: imageUrls, // send array (backend should support)
      };

      await CreateComplaint(payload);

      toast.success("Complaint submitted successfully 🎉");

      setForm({
        title: "",
        description: "",
        type: "NON_EMERGENCY",
        location: "",
        latitude: "",
        longitude: "",
        images: [],
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen px-4 py-24 flex items-center justify-center relative overflow-hidden">

      <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[120px] opacity-60" />

      <div className="c-glow absolute top-[40%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[var(--accent-core)] opacity-20 blur-[140px] rounded-full" />

      <div className="w-full max-w-3xl bg-[var(--bg-glass)] backdrop-blur-2xl border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-strong)] p-6 md:p-9 space-y-6">

        <div className="text-center space-y-2">
          <h1 className="c-heading text-[30px] md:text-[36px] font-semibold">
            Raise a <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-core),var(--accent-aurora))]">Complaint</span>
          </h1>
          <p className="c-sub text-[var(--text-secondary)]">
            Share your concern clearly and securely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input name="title" value={form.title} onChange={handleChange} placeholder="Title"
            className="c-field px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] col-span-2" />

          <textarea name="description" value={form.description} onChange={handleChange}
            className="c-field px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] col-span-2" />

          <select name="type" value={form.type} onChange={handleChange} className="c-field">
            <option value="NON_EMERGENCY">Non Emergency</option>
            <option value="EMERGENCY">Emergency</option>
          </select>

          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="c-field" />
          <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitude" className="c-field" />
          <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude" className="c-field" />

          <div className="c-upload col-span-2">
            <input
              id="imageUpload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleImages(e.target.files)}
            />

            <label htmlFor="imageUpload" className="cursor-pointer block text-center p-5 border border-dashed rounded-[var(--radius-md)]">
              Upload Images
            </label>

            <div className="grid grid-cols-3 gap-3 mt-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={URL.createObjectURL(img)} className="h-24 w-full object-cover rounded" />
                  <button onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/70 text-white w-6 h-6 rounded-full text-xs">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="c-submit btn-root btn-primary w-full"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

      </div>
    </div>
  );
};

export default ComplaintPage;