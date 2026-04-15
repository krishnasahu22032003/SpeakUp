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
  const [currentComplaint, setCurrentComplaint] = useState(complaint);

    useEffect(() => {
    setCurrentComplaint(complaint);
    setStatus(complaint.status); 
  }, [complaint]);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
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

    const res = await AdminUpdateComplaint(currentComplaint.id, {
      status,
      updatedAt: currentComplaint.updatedAt,
    });

    toast.success(res.message);

    setCurrentComplaint(res.data); 
    onUpdate(res.data); 

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
          relative z-10 w-full max-w-lg
          rounded-2xl bg-[var(--bg-glass)]
          border border-[var(--border-subtle)]
          shadow-[0_20px_80px_rgba(0,0,0,0.6)]
          backdrop-blur-2xl
          p-5 sm:p-6
        "
      >

        <div className="absolute inset-0 pointer-events-none rounded-2xl">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-[var(--accent-core)] opacity-20 blur-3xl rounded-full" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[var(--accent-calm)] opacity-20 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 flex justify-between items-start mb-4">
          <div>
            <h2 className="text-[17px] font-semibold tracking-tight text-[var(--text-primary)]">
              Complaint Details
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Review and update complaint status
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative z-10 space-y-3">

          <div>
            <p className="text-[10px] text-[var(--text-muted)]">Title</p>
            <h3 className="text-[14px] font-medium text-[var(--text-primary)]">
              {complaint.title}
            </h3>
          </div>

          <div>
            <p className="text-[10px] text-[var(--text-muted)]">Description</p>
            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
              {complaint.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
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
              className="w-full h-44 object-cover rounded-xl"
            />
          )}

          <div>
            <p className="text-[10px] text-[var(--text-muted)] mb-1">Status</p>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="
              cursor-pointer
                w-full h-10 px-3 rounded-xl
                bg-[var(--bg-elevated)]
                border border-[var(--border-subtle)]
                text-[var(--text-primary)] text-sm
                focus:outline-none focus:ring-1 focus:ring-[var(--accent-core)]
              "
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="DISMISSED">Dismissed</option>
            </select>
          </div>

        </div>

        <div className="flex gap-3 mt-5">

          <button
            onClick={onClose}
            className="
            cursor-pointer
              flex-1 h-10 rounded-xl
              bg-white/5 border border-white/10
              text-[var(--text-secondary)] text-sm
              hover:bg-white/10 transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="
            cursor-pointer
              flex-1 h-10 rounded-xl
              bg-[var(--accent-core)]
              text-white text-sm font-semibold
              hover:scale-[1.02]
              active:scale-[0.97]
              transition-all duration-300
              shadow-[0_0_20px_rgba(47,63,168,0.45)]
            "
          >
            {loading ? "Updating..." : "Update Status"}
          </button>

        </div>

      </div>
    </div>
  );
}