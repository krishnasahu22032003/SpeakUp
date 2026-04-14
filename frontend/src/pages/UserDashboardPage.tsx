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

type Status = "PENDING" | "RESOLVED" | "IN_PROGRESS" | "DISMISSED";

const mockComplaints = [
  {
    id: "1",
    title: "Road Damage near Sector 5",
    description:
      "Large potholes causing traffic disruption and safety issues.",
    status: "PENDING",
    location: "Sector 5, Noida",
    latitude: "28.567",
    longitude: "77.321",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    createdAt: "2 days ago",
  },
  {
    id: "2",
    title: "Streetlight Not Working",
    description:
      "Street completely dark at night leading to safety concerns.",
    status: "IN_PROGRESS",
    location: "MG Road",
    latitude: "28.45",
    longitude: "77.02",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    createdAt: "5 days ago",
  },
];

const UserDashboardPage = () => {
  const containerRef = useRef(null);
  const [ismodalOpen , setismodalOpen]=useState<boolean>(false);

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

  const statusStyle = (status: Status) => {
    switch (status) {
      case "RESOLVED":
        return "bg-[#00FF94]/90 text-black shadow-[0_0_20px_#00FF94]";
      case "IN_PROGRESS":
        return "bg-[#FFC857]/90 text-black shadow-[0_0_20px_#FFC857]";
      case "DISMISSED":
        return "bg-[#FF3B6B]/90 text-white shadow-[0_0_20px_#FF3B6B]";
      default:
        return "bg-[#00E5FF]/90 text-black shadow-[0_0_20px_#00E5FF]";
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

            {mockComplaints.map((c) => (
              <div
                key={c.id}
                className="d-card group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
              >

                <div className="relative h-40 overflow-hidden">

                  <img
                    src={c.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[1deg]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent dark:from-black/70 dark:via-black/20" />

                  <div className={`absolute top-3 right-3 text-[11px] px-3 py-1 rounded-full font-medium backdrop-blur-md ${statusStyle(c.status as Status)}`}>
                    {c.status.replace("_", " ")}
                  </div>

                </div>

                <div className="p-4 space-y-3">

                  <h3 className="text-[16px] font-semibold text-[var(--text-primary)] transition-colors duration-300">
                    {c.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] text-xs leading-relaxed line-clamp-2">
                    {c.description}
                  </p>

                  <div className="flex flex-col gap-2 text-[11px] text-[var(--text-muted)]">

                    <div className="flex items-center gap-2 transition-colors duration-300">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{c.location}</span>
                    </div>

                    <div className="flex items-center gap-2 transition-colors duration-300">
                      <Globe className="w-3.5 h-3.5" />
                      <span>{c.latitude}, {c.longitude}</span>
                    </div>

                    <div className="flex items-center gap-2 transition-colors duration-300">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{c.createdAt}</span>
                    </div>

                  </div>

                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                  <div className="absolute -top-20 -left-20 w-52 h-52 bg-[var(--accent-core)] blur-[120px] opacity-20" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#00E5FF] blur-[100px] opacity-10" />
                </div>

              </div>
            ))}

          </div>

          <div className="flex justify-center gap-4 pt-6">
            <Button variant="secondary" className="h-10 px-5 text-sm hover:scale-105 active:scale-95 transition">
              Previous
            </Button>
            <Button variant="secondary" className="h-10 px-5 text-sm hover:scale-105 active:scale-95 transition">
              Next
            </Button>
          </div>

        </div>
      </section>

      {ismodalOpen && <ComplaintModal onClose={()=>setismodalOpen(false)} />}
    </>
  );
};

export default UserDashboardPage;