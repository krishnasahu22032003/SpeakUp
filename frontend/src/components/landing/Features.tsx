import {
  Shield,
  MessageSquare,
  EyeOff,
  Bell,
  Activity,
  Lock
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Reporting",
    desc: "End-to-end encrypted system ensuring every report stays protected and tamper-proof."
  },
  {
    icon: EyeOff,
    title: "Anonymous Mode",
    desc: "Raise concerns without revealing identity. Full privacy with zero compromise."
  },
  {
    icon: MessageSquare,
    title: "Admin Chat",
    desc: "Direct communication between admins and users for faster and clearer resolutions."
  },
  {
    icon: Bell,
    title: "Real-time Updates",
    desc: "Stay informed with instant status updates and notifications on your reports."
  },
  {
    icon: Activity,
    title: "Live Tracking",
    desc: "Track progress of your complaint with full transparency and timeline visibility."
  },
  {
    icon: Lock,
    title: "Data Protection",
    desc: "Built with strict security protocols to safeguard sensitive information."
  }
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative py-22 px-6 overflow-hidden"
    >

      <div className="absolute inset-0 -z-10 bg-[var(--gradient-mesh)] blur-[120px] opacity-70" />

      <div className="max-w-[1100px] mx-auto text-center mb-16">
        
        <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-semibold text-[var(--text-primary)] tracking-tight">
          Powerful Features Built for{" "}
          <span className="bg-gradient-to-r from-[var(--accent-core)] to-[var(--accent-aurora)] bg-clip-text text-transparent">
            Real Impact
          </span>
        </h2>

        <p className="mt-4 text-[16px] sm:text-[18px] text-[var(--text-secondary)] max-w-2xl mx-auto">
          Everything you need to report, track, and resolve issues — securely, transparently, and efficiently.
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {features.map((feature, i) => {
          const Icon = feature.icon;

          return (
            <div
              key={i}
              className="group relative p-6 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-strong)]"
            >

              <div className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle_at_top,rgba(99,110,246,0.15),transparent_70%)]" />

              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--accent-core)]/10 text-[var(--accent-core)] mb-5 transition group-hover:scale-110 group-hover:bg-[var(--accent-core)]/20">
                <Icon size={22} />
              </div>

              <h3 className="text-[18px] font-semibold text-[var(--text-primary)] mb-2">
                {feature.title}
              </h3>

              <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
                {feature.desc}
              </p>

              <div className="absolute inset-0 rounded-[var(--radius-lg)] border border-transparent group-hover:border-[var(--accent-core)]/20 transition" />
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default Features;