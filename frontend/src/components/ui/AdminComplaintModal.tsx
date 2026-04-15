import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import { toast } from "sonner";
import { AdminUpdateComplaint } from "../../lib/services/AdminComplaints";

type Props = {
  complaint: any;
  onClose: () => void;
  onUpdate: (updated: any) => void;
};

export default function AdminComplaintModal({
  complaint,
  onClose,
  onUpdate,
}: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState(complaint.status);
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

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await AdminUpdateComplaint(complaint.id, {
        status,
        updatedAt: complaint.updatedAt,
      });

      toast.success(res.message);

      onUpdate({
        ...complaint,
        status,
        updatedAt: new Date().toISOString(),
      });

      onClose();
    } catch (err: any) {
      if (err?.response?.status === 409) {
        toast.error("Already updated by another admin. Refresh.");
      } else {
        toast.error("Update failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-3">

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xl"
      />

      <div
        ref={modalRef}
        className="
          relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto
          rounded-2xl bg-[var(--bg-glass)]
          border border-[var(--border-subtle)]
          shadow-[var(--shadow-strong)]
          backdrop-blur-2xl p-6
        "
      >

        <div className="absolute inset-0 pointer-events-none rounded-2xl">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-[var(--accent-core)] opacity-20 blur-3xl rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[var(--accent-calm)] opacity-20 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 flex justify-between items-start mb-5">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              Complaint Details
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Review and update complaint status
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--bg-elevated)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative z-10 space-y-4">

          <div>
            <p className="text-xs text-[var(--text-muted)]">Title</p>
            <h3 className="text-[var(--text-primary)] font-medium">
              {complaint.title}
            </h3>
          </div>

          <div>
            <p className="text-xs text-[var(--text-muted)]">Description</p>
            <p className="text-[var(--text-secondary)] text-sm">
              {complaint.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[var(--text-muted)]">Location</p>
              <p className="text-[var(--text-primary)]">
                {complaint.location || "-"}
              </p>
            </div>

            <div>
              <p className="text-[var(--text-muted)]">Created</p>
              <p className="text-[var(--text-primary)]">
                {new Date(complaint.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {complaint.image?.[0] && (
            <img
              src={complaint.image[0]}
              className="w-full h-52 object-cover rounded-xl"
            />
          )}

          <div>
            <p className="text-xs text-[var(--text-muted)] mb-1">Status</p>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="
                w-full h-11 px-3 rounded-xl
                bg-[var(--bg-elevated)]
                border border-[var(--border-subtle)]
                text-[var(--text-primary)]
              "
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="DISMISSED">Dismissed</option>
            </select>
          </div>

        </div>

        <div className="flex gap-3 mt-6">

          <button
            onClick={onClose}
            className="
              flex-1 h-11 rounded-xl
              bg-white/5 border border-white/10
              text-[var(--text-secondary)]
              hover:bg-white/10 transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="
              flex-1 h-11 rounded-xl
              bg-[var(--accent-core)]
              text-white font-medium
              hover:shadow-[0_0_20px_rgba(47,63,168,0.5)]
              transition
            "
          >
            {loading ? "Updating..." : "Update Status"}
          </button>

        </div>

      </div>
    </div>
  );
}