import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Button from "../components/ui/Button";
import {
  MapPin,
  Globe,
  Clock,
  Activity,
} from "lucide-react";
import UserDashboardHeader from "../components/ui/UserDashboardHeader";
import ComplaintModal from "../components/ui/DashboardComplaintModal";
import { GetUserComplaints } from "../lib/services/ComplaintService";

type Status = "PENDING" | "RESOLVED" | "IN_PROGRESS" | "DISMISSED";

const UserDashboardPage = () => {
  const containerRef = useRef(null);
  const [ismodalOpen, setismodalOpen] = useState<boolean>(false);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);

        const res = await GetUserComplaints(page, 6);
        const safeData = Array.isArray(res) ? res : [];

        setComplaints(safeData);
        setHasMore(safeData.length >= 6);
      } catch (err) {
        console.error(err);
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [page]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.to(".d-badge", { y: 0, opacity: 1, duration: 0.5 })
        .to(".d-title", { y: 0, opacity: 1, duration: 0.7 }, "-=0.3")
        .to(".d-sub", { y: 0, opacity: 1, duration: 0.5 }, "-=0.5")
        .to(".d-cta", { y: 0, opacity: 1, duration: 0.4 }, "-=0.4")
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
      <UserDashboardHeader />

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
                <Activity className="w-4 h-4 text-[var(--accent-core)]" />
                <span className="text-sm text-[var(--text-secondary)]">
                  Personal Dashboard
                </span>
              </div>

              <h1 className="d-title text-[32px] md:text-[44px] font-semibold tracking-tight text-[var(--text-primary)] leading-[1.1]">
                <span className="mr-2">Your</span>
                <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-core),#7A5CFF,#00E5FF)]">
                  Reports
                </span>
              </h1>

              <p className="d-sub text-[var(--text-secondary)] text-sm md:text-base max-w-xl leading-relaxed">
                Track, monitor and manage all the complaints you’ve raised — in one place.
              </p>
            </div>

            <div className="d-cta">
              <Button
                className="h-11 px-6 text-[14px] hover:scale-[1.04] active:scale-[0.96] transition-all duration-300"
                onClick={() => setismodalOpen(true)}
              >
                Create Complaint
              </Button>
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
                  No complaints yet
                </p>
              </div>
            ) : (
              complaints.map((c, i) => {
                const imageSrc =
                  Array.isArray(c.image) && c.image.length > 0
                    ? c.image[0]
                    : "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

                return (
             <div
  key={c.id || i}
  className="d-card group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow-soft)] min-h-[270px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-strong)]"
>

  <div className="relative h-44 w-full overflow-hidden">

    <img
      src={imageSrc}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[1deg]"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

    <div className={`absolute top-3 right-3 z-20 text-[11px] px-3 py-1 rounded-full font-medium backdrop-blur-md transition-all duration-300 group-hover:scale-105 ${statusStyle(c.status)}`}>
      {c.status ? c.status.replace("_", " ") : "UNKNOWN"}
    </div>

  </div>

  <div className="p-4 flex flex-col gap-3 relative z-10">

    <h3 className="text-[15px] md:text-[16px] font-semibold text-[var(--text-primary)] leading-snug tracking-tight">
      {c.title || "No Title"}
    </h3>

    <p className="text-[12px] md:text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
      {c.description || "No description available"}
    </p>

    <div className="flex flex-col gap-2 text-[11px] text-[var(--text-muted)]">

      <div className="flex items-center gap-2 transition-colors duration-300 group-hover:text-[var(--text-secondary)]">
        <MapPin className="w-3.5 h-3.5 opacity-80" />
        <span>{c.location || "Unknown location"}</span>
      </div>

      <div className="flex items-center gap-2 transition-colors duration-300 group-hover:text-[var(--text-secondary)]">
        <Globe className="w-3.5 h-3.5 opacity-80" />
        <span>
          {c.latitude?.toString() || "-"},{" "}
          {c.longitude?.toString() || "-"}
        </span>
      </div>

      <div className="flex items-center gap-2 transition-colors duration-300 group-hover:text-[var(--text-secondary)]">
        <Clock className="w-3.5 h-3.5 opacity-80" />
        <span>
          {c.createdAt
            ? new Date(c.createdAt).toLocaleDateString()
            : "-"}
        </span>
      </div>

    </div>

  </div>

  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
    <div className="absolute -top-20 -left-20 w-52 h-52 bg-[var(--accent-core)] blur-[120px] opacity-20" />
    <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#00E5FF] blur-[100px] opacity-10" />
  </div>

</div>
                );
              })
            )}

          </div>

          <div className="flex justify-center gap-4 pt-6">
            <Button
              variant="secondary"
              className="h-10 px-5 text-sm hover:scale-105 active:scale-95 transition"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            <Button
              variant="secondary"
              className="h-10 px-5 text-sm hover:scale-105 active:scale-95 transition"
              disabled={!hasMore}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>

        </div>
      </section>

      {ismodalOpen && <ComplaintModal onClose={() => setismodalOpen(false)} />}
    </>
  );
};

export default UserDashboardPage;