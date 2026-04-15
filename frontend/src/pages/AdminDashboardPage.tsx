import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  MapPin,
  Globe,
  Clock,
  Shield,
  Pencil,
  Trash2,
} from "lucide-react";
import AdminDashboardHeader from "../components/ui/AdminDashboardHeader";
import { GetAdminComplaints } from "../lib/services/AdminComplaints";
import { GetAdminDetails } from "../lib/services/AdminAuthService";
import AdminComplaintModal from "../components/ui/AdminComplaintModal";
import DeleteModal from "../components/ui/DeleteModal";
import { DeleteUserComplaint } from "../lib/services/ComplaintService";
import { toast } from "sonner";

const AdminDashboardPage = () => {
  const containerRef = useRef(null);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [admin, setAdmin] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);

  const confirmDelete = async () => {
  if (!selectedComplaintId) return;

  const promise = DeleteUserComplaint(selectedComplaintId);

  toast.promise(promise, {
    loading: "Deleting complaint...",
    success: () => {
      setComplaints((prev) =>
        prev.filter((c) => c.id !== selectedComplaintId)
      );
      setDeleteModalOpen(false);
      return "Complaint deleted";
    },
    error: "Failed to delete",
  });
};

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const [complaintsRes, adminRes] = await Promise.all([
          GetAdminComplaints(page, 6),
          GetAdminDetails(),
        ]);

        setComplaints(complaintsRes.complaints || []);
        setHasMore(complaintsRes.complaints?.length >= 6);
        setAdmin(adminRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [page]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".d-badge", { y: 0, opacity: 1, duration: 0.5 })
        .to(".d-title", { y: 0, opacity: 1, duration: 0.7 }, "-=0.3")
        .to(".d-sub", { y: 0, opacity: 1, duration: 0.5 }, "-=0.5")
        .to(".d-card", {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
        }, "-=0.3");

      gsap.to(".d-glow", {
        y: 60,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const statusStyle = (status?: string) => {
    switch (status) {
      case "RESOLVED":
        return "bg-emerald-500/90 text-white shadow-[0_0_18px_rgba(16,185,129,0.6)]";
      case "IN_PROGRESS":
        return "bg-sky-500/90 text-white shadow-[0_0_18px_rgba(14,165,233,0.6)]";
      case "DISMISSED":
        return "bg-rose-500/90 text-white shadow-[0_0_18px_rgba(244,63,94,0.6)]";
      default:
        return "bg-amber-400/90 text-black shadow-[0_0_18px_rgba(251,191,36,0.6)]";
    }
  };

  return (
    <>
      <AdminDashboardHeader />

      <section
        ref={containerRef}
        className="relative min-h-screen px-4 py-20 bg-[var(--bg-base)] overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[140px] opacity-70" />
        <div className="d-glow absolute top-[40%] left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-[var(--accent-core)] opacity-20 blur-[160px] rounded-full" />

        <div className="max-w-6xl mx-auto space-y-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="space-y-3">
              <div className="d-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl">
                <Shield className="w-4 h-4 text-[var(--accent-core)]" />
                <span className="text-sm text-[var(--text-secondary)]">
                  Admin Dashboard
                </span>
              </div>

              <h1 className="d-title text-[32px] md:text-[44px] font-semibold tracking-tight text-[var(--text-primary)]">
                Welcome back,{" "}
                <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-core),#7A5CFF,#00E5FF)]">
                  {admin?.username || "Admin"}
                </span>
              </h1>

              <p className="d-sub text-[var(--text-secondary)] text-sm md:text-base max-w-xl">
                Monitor activity, manage complaints, and keep the system running smoothly.
              </p>
            </div>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {loading ? (
              <div className="col-span-full flex justify-center py-20 text-[var(--text-secondary)]">
                Loading complaints...
              </div>
            ) : complaints.length === 0 ? (
              <div className="col-span-full flex items-center justify-center py-20 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl">
                <p className="text-[var(--text-secondary)] text-lg">
                  No complaints found
                </p>
              </div>
            ) : (
              complaints.map((c, i) => (
                <div
                  key={c.id || i}
                  className="d-card group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow-soft)] min-h-[270px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-strong)]"
                >

                  <div className="relative h-44 w-full overflow-hidden flex items-center justify-center">
                    <button
  onClick={() => {
    setSelectedComplaintId(c.id);
    setDeleteModalOpen(true);
  }}
 className="
  absolute top-3 left-3 z-20
  cursor-pointer
  flex items-center justify-center
  w-9 h-9 rounded-full
  bg-black/50 backdrop-blur-md
  border border-white/20
  text-white
  hover:bg-rose-500/80
  hover:scale-110
  active:scale-95
  transition-all duration-300
  shadow-[0_0_10px_rgba(0,0,0,0.6)]
"
>
  <Trash2 className="w-4 h-4" />
</button>

                    {Array.isArray(c.image) && c.image.length > 0 ? (
                      <img
                        src={c.image[0]}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]">
                        <img src="/no-image.png" className="w-12 h-12 opacity-60" />
                        <span>No Image Available</span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className={`absolute top-3 right-3 text-[11px] px-3 py-1 rounded-full ${statusStyle(c.status)}`}>
                      {c.status?.replace("_", " ")}
                    </div>

                  </div>

                  <div className="p-4 flex flex-col gap-3">

                    <h3 className="text-[15px] font-semibold text-[var(--text-primary)]">
                      {c.title}
                    </h3>

                    <p className="text-[12px] text-[var(--text-secondary)] line-clamp-2">
                      {c.description}
                    </p>

                    <div className="flex flex-col gap-2 text-[11px] text-[var(--text-muted)]">

                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{c.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{c.latitude}, {c.longitude}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>

                    </div>

                  </div>

                  <div className="flex justify-end p-3 pt-0">

                    <button
                      onClick={() => {
                        setSelectedComplaint(c);
                        setModalOpen(true);
                      }}
                      className="
                      cursor-pointer
                        flex items-center gap-2 px-4 py-2 rounded-xl
                        text-xs font-semibold
                        bg-[var(--accent-core)]/20
                        border border-[var(--accent-core)]/30
                        hover:scale-105 transition
                      "
                    >
                      <Pencil className="w-4 h-4" />
                      Update
                    </button>

                  </div>

                </div>
              ))
            )}

          </div>

          <div className="flex justify-center gap-4 pt-6">
            <button
              className="h-10 px-5 text-sm rounded-xl bg-[var(--bg-glass)] border border-[var(--border-subtle)]"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </button>

            <button
              className="h-10 px-5 text-sm rounded-xl bg-[var(--bg-glass)] border border-[var(--border-subtle)]"
              disabled={!hasMore}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>

        </div>
      </section>

      {modalOpen && selectedComplaint && (
        <AdminComplaintModal
          complaint={selectedComplaint}
          onClose={() => setModalOpen(false)}
          onUpdate={(updated) => {
            setComplaints((prev) =>
              prev.map((c) =>
                c.id === updated.id ? updated : c
              )
            );
          }}
        />
      )}
      <DeleteModal
  open={deleteModalOpen}
  onClose={() => setDeleteModalOpen(false)}
  onConfirm={confirmDelete}
/>
    </>
  );
};

export default AdminDashboardPage;