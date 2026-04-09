import { useState } from "react";

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
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    type: "NON_EMERGENCY",
    location: "",
    latitude: "",
    longitude: "",
    images: [],
  });

  const handleChange = (e:any) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const selected = Array.from(files || []) as File[];
      setForm({ ...form, images: [...form.images, ...selected] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const removeImage = (index:number) => {
    const updated = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: updated });
  };

  return (
    <div className="min-h-screen px-4 py-24 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[120px] opacity-60" />

      <div className="w-full max-w-3xl bg-[var(--bg-glass)] backdrop-blur-2xl border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-strong)] p-6 md:p-9 space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-[30px] md:text-[36px] font-semibold tracking-tight text-[var(--text-primary)]">
            Raise a {" "}
            <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-core),var(--accent-aurora))]">
              Complaint
            </span>
          </h1>
          <p className="text-[14px] md:text-[15px] text-[var(--text-secondary)] max-w-lg mx-auto">
            Share your concern clearly and securely. We make sure it reaches the right hands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="col-span-2">
            <label className="text-xs text-[var(--text-muted)]">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Short issue title"
              className="mt-1 w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-core)] focus:shadow-[var(--glow-core)] outline-none transition-all"
            />
          </div>

          <div className="col-span-2">
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

          <div>
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

          <div>
            <label className="text-xs text-[var(--text-muted)]">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="City or area"
              className="mt-1 w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-core)] focus:shadow-[var(--glow-core)] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-xs text-[var(--text-muted)]">Latitude</label>
            <input
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="28.6139"
              className="mt-1 w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-core)] focus:shadow-[var(--glow-core)] outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-xs text-[var(--text-muted)]">Longitude</label>
            <input
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="77.2090"
              className="mt-1 w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-core)] focus:shadow-[var(--glow-core)] outline-none transition-all"
            />
          </div>

          <div className="col-span-2">
            <label className="text-xs text-[var(--text-muted)]">Upload Images</label>
            <label className="mt-1 w-full border border-dashed border-[var(--border-subtle)] rounded-[var(--radius-md)] p-5 flex flex-col items-center justify-center gap-2 bg-[var(--bg-elevated)] hover:border-[var(--accent-core)] transition-all cursor-pointer">
              <input type="file" name="images" accept="image/*" multiple onChange={handleChange} className="hidden" />
              <span className="text-sm text-[var(--text-secondary)]">Click to upload multiple images</span>
            </label>

            {form.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {form.images.map((img, i) => {
                  const url = URL.createObjectURL(img);
                  return (
                    <div key={i} className="relative group">
                      <img src={url} className="w-full h-24 object-cover rounded-[12px]" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition"
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

        <div className="flex justify-center pt-2">
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