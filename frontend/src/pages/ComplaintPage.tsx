import { useState, useEffect, useRef } from "react";
import { compressImage } from "../utils/compressImage";
import gsap from "gsap";

type FormState = {
  title: string;
  description: string;
  type: "NON_EMERGENCY" | "EMERGENCY";
  location: string;
  latitude: string;
  longitude: string;
  images: File[];
};

const ComplaintPage = () => {
  const containerRef = useRef(null);

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    type: "NON_EMERGENCY",
    location: "",
    latitude: "",
    longitude: "",
    images: [],
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(".c-heading", { y: 40, opacity: 0, duration: 1 })
        .from(".c-sub", { y: 30, opacity: 0, duration: 1 }, "-=0.6")
        .from(".c-field", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
        }, "-=0.6")
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

    const compressedImages = await Promise.all(
      fileArray.map((file) => compressImage(file))
    );

    const uniqueImages = compressedImages.filter(
      (newImg) =>
        !form.images.some((img) => img.name === newImg.name)
    );

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...uniqueImages],
    }));
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen px-4 py-24 flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[120px] opacity-60" />

      <div className="c-glow absolute top-[40%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[var(--accent-core)] opacity-20 blur-[140px] rounded-full" />

      <div className="w-full max-w-3xl bg-[var(--bg-glass)] backdrop-blur-2xl border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-strong)] p-6 md:p-9 space-y-6">

        <div className="text-center space-y-2">
          <h1 className="c-heading text-[30px] md:text-[36px] font-semibold tracking-tight text-[var(--text-primary)]">
            Raise a {" "}
            <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-core),var(--accent-aurora))]">
              Complaint
            </span>
          </h1>
          <p className="c-sub text-[14px] md:text-[15px] text-[var(--text-secondary)] max-w-lg mx-auto">
            Share your concern clearly and securely. We make sure it reaches the right hands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="c-field col-span-2">
            <label className="text-xs text-[var(--text-muted)]">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Short issue title"
              className="mt-1 w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-core)] focus:shadow-[var(--glow-core)] outline-none transition-all"
            />
          </div>

          <div className="c-field col-span-2">
            <label className="text-xs text-[var(--text-muted)]">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Explain the issue"
              className="mt-1 w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-core)] focus:shadow-[var(--glow-core)] outline-none resize-none transition-all"
            />
          </div>

          <div className="c-field">
            <label className="text-xs text-[var(--text-muted)]">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] focus:border-[var(--accent-core)] outline-none"
            >
              <option value="NON_EMERGENCY">Non Emergency</option>
              <option value="EMERGENCY">Emergency</option>
            </select>
          </div>

          <div className="c-field">
            <label className="text-xs text-[var(--text-muted)]">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="City or area"
              className="mt-1 w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-core)] focus:shadow-[var(--glow-core)] outline-none transition-all"
            />
          </div>

          <div className="c-field">
            <label className="text-xs text-[var(--text-muted)]">Latitude</label>
            <input
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="28.6139"
              className="mt-1 w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-core)] focus:shadow-[var(--glow-core)] outline-none transition-all"
            />
          </div>

          <div className="c-field">
            <label className="text-xs text-[var(--text-muted)]">Longitude</label>
            <input
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="77.2090"
              className="mt-1 w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-core)] focus:shadow-[var(--glow-core)] outline-none transition-all"
            />
          </div>

          <div className="c-upload col-span-2">
            <label className="text-xs text-[var(--text-muted)]">Upload Images</label>

            <input
              id="imageUpload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) handleImages(e.target.files);
              }}
            />

            <label
              htmlFor="imageUpload"
              className="mt-1 w-full border border-dashed border-[var(--border-subtle)] rounded-[var(--radius-md)] p-5 flex flex-col items-center justify-center gap-2 bg-[var(--bg-elevated)] hover:border-[var(--accent-core)] transition-all cursor-pointer"
            >
              <span className="text-sm text-[var(--text-secondary)]">
                Click to upload multiple images
              </span>
            </label>

            {form.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {form.images.map((img, i) => {
                  const url = URL.createObjectURL(img);
                  return (
                    <div key={i} className="relative group">
                      <img
                        src={url}
                        onLoad={(e) =>
                          URL.revokeObjectURL(
                            (e.target as HTMLImageElement).src
                          )
                        }
                        className="w-full h-24 object-cover rounded-[12px]"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute cursor-pointer top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/70 text-white text-xs opacity-100 md:opacity-0 md:group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="c-submit flex justify-center pt-2">
          <button className="btn-root btn-primary">
            <span className="btn-content">Submit Complaint</span>
            <span className="btn-glow" />
            <span className="btn-highlight" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintPage;
