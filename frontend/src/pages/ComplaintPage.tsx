import { useState, useEffect, useRef } from "react";
import { compressImage } from "../utils/compressImage";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { CreateComplaint } from "../lib/services/ComplaintService";
import gsap from "gsap";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

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
    gsap.set([".c-heading", ".c-sub", ".c-field", ".c-upload", ".c-submit"], {
      opacity: 1,
      y: 0,
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".c-heading", { y: 30, opacity: 0, duration: 1.2 })
      .from(".c-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.5")
      .from(".c-field", { y: 20, opacity: 0, duration: 0.6, stagger: 0.06 }, "-=0.4")
      .from(".c-upload", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".c-submit", { y: 15, opacity: 0, duration: 0.6 }, "-=0.4");

    gsap.to(".c-glow", {
      y: 40,
      duration: 6,
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
<div
  ref={containerRef}
  className="min-h-screen px-4 py-12 md:py-16 flex items-center justify-center relative overflow-hidden bg-[var(--bg-base)]"
>
    <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[120px] opacity-60" />

    <div className="c-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-core)] opacity-20 blur-[160px] rounded-full" />

    <div className="w-full max-w-4xl bg-[var(--bg-glass)] backdrop-blur-2xl border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-strong)] px-6 md:px-10 py-8 md:py-10 space-y-8">

      <div className="text-center space-y-3">
        <h1 className="c-heading text-[30px] md:text-[40px] font-semibold tracking-tight text-[var(--text-primary)] leading-tight">
          Raise a{" "}
          <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-core),var(--accent-aurora))]">
            Complaint
          </span>
        </h1>
        <p className="c-sub text-[15px] md:text-[16px] text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Share your concern clearly and securely. Your report helps us take faster and smarter action.
        </p>
      </div>
<div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5">

      <input
  name="title"
  value={form.title}
  onChange={handleChange}
  placeholder="Complaint title"
 className="c-field w-full md:col-span-2 h-12 px-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
/>
<textarea
  name="description"
  value={form.description}
  onChange={handleChange}
  placeholder="Describe the issue in detail..."
  rows={5}
   className="c-field w-full md:col-span-2 px-4 py-3 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] resize-none"
/>


<div className="relative w-full md:w-auto md:col-span-1">
  <select
    name="type"
    value={form.type}
    onChange={handleChange}
    className="c-field text-sm md:text-base truncate w-full h-12 px-4 pr-10 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] appearance-none truncate overflow-hidden whitespace-nowrap"
  >
    <option value="NON_EMERGENCY">Non Emergency</option>
    <option value="EMERGENCY">Emergency</option>
  </select>

</div>

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="c-field h-12 px-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
        />

        <input
          name="latitude"
          value={form.latitude}
          onChange={handleChange}
          placeholder="Latitude ex:22.32"
          className="c-field h-12 px-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
        />

        <input
          name="longitude"
          value={form.longitude}
          onChange={handleChange}
          placeholder="Longitude ex:22.30"
          className="c-field h-12 px-4 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
        />

     <div className="c-upload w-full md:col-span-2 space-y-4">

          <input
            id="imageUpload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleImages(e.target.files)}
          />

          <label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center gap-2 h-32 border border-dashed border-[var(--border-subtle)] rounded-[var(--radius-md)] cursor-pointer hover:border-[var(--accent-core)] hover:bg-[var(--bg-elevated)] transition-all"
          >
            <span className="text-sm text-[var(--text-secondary)]">
              Click to upload images
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              Max {MAX_IMAGES} images • JPG, PNG
            </span>
          </label>

          {form.images.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(img)}
                    className="h-24 w-full object-cover rounded-[12px]"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute cursor-pointer top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/70 text-white text-xs opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
                  >
                    ✕
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
  className="c-submit w-full h-12 text-[15px] font-medium rounded-[var(--radius-md)] mt-2"
>
  Submit Complaint
</Button>

    </div>
  </div>
);
};

export default ComplaintPage;