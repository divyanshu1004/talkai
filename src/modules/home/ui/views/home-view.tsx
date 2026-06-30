"use client";

import Link from "next/link";
import {
  VideoIcon,
  BotIcon,
  StarIcon,
  ArrowRightIcon,
  ZapIcon,
  ShieldCheckIcon,
  BrainCircuitIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { authClient } from "@/lib/auth-client";
import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from "@/modules/premium/constants";

// ── Usage pill ────────────────────────────────────────────────────────────────
interface UsagePillProps {
  label: string;
  used: number;
  max: number;
}
const UsagePill = ({ label, used, max }: UsagePillProps) => {
  const pct = Math.min((used / max) * 100, 100);
  const isFull = used >= max;
  return (
    <div style={{
      borderRadius: "12px",
      border: "1px solid hsl(var(--border, 220 13% 91%))",
      background: "var(--card, white)",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--foreground)" }}>{label}</span>
        <span style={{
          fontSize: "11px",
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: "999px",
          background: isFull ? "#fee2e2" : "#dcfce7",
          color: isFull ? "#dc2626" : "#16a34a",
        }}>
          {used}/{max}
        </span>
      </div>
      {/* progress track */}
      <div style={{ height: "6px", width: "100%", borderRadius: "999px", background: "#e5e7eb", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          borderRadius: "999px",
          background: isFull ? "#dc2626" : "#22c55e",
          transition: "width 0.4s ease",
        }} />
      </div>
      <p style={{ fontSize: "11px", color: "#6b7280", margin: 0 }}>
        {isFull ? "Limit reached — upgrade to continue" : `${max - used} remaining on free plan`}
      </p>
    </div>
  );
};

// ── Action card ───────────────────────────────────────────────────────────────
interface ActionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  iconBg: string;
  iconColor: string;
}
const ActionCard = ({ icon: Icon, title, description, href, iconBg, iconColor }: ActionCardProps) => (
  <Link href={href} style={{ textDecoration: "none" }}>
    <div style={{
      borderRadius: "12px",
      border: "1px solid hsl(var(--border, 220 13% 91%))",
      background: "var(--card, white)",
      padding: "18px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      cursor: "pointer",
      transition: "box-shadow 0.2s ease, transform 0.2s ease",
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "none";
      }}
    >
      <div style={{
        width: "40px", height: "40px",
        borderRadius: "10px",
        background: iconBg,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon style={{ width: "18px", height: "18px", color: iconColor }} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 600, color: "var(--foreground)" }}>{title}</p>
        <p style={{ margin: 0, fontSize: "12px", color: "#6b7280", lineHeight: 1.6 }}>{description}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600, color: iconColor }}>
        Open {title}
        <ArrowRightIcon style={{ width: "12px", height: "12px" }} />
      </div>
    </div>
  </Link>
);

// ── Feature row ───────────────────────────────────────────────────────────────
interface FeatureProps {
  icon: React.ElementType;
  title: string;
  body: string;
}
const Feature = ({ icon: Icon, title, body }: FeatureProps) => (
  <div style={{ display: "flex", gap: "12px" }}>
    <div style={{
      width: "32px", height: "32px", borderRadius: "8px",
      background: "#dcfce7",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, marginTop: "2px",
    }}>
      <Icon style={{ width: "15px", height: "15px", color: "#16a34a" }} />
    </div>
    <div>
      <p style={{ margin: "0 0 2px 0", fontSize: "13px", fontWeight: 600, color: "var(--foreground)" }}>{title}</p>
      <p style={{ margin: 0, fontSize: "12px", color: "#6b7280", lineHeight: 1.6 }}>{body}</p>
    </div>
  </div>
);

// ── Section label ─────────────────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    margin: "0 0 12px 0",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#9ca3af",
  }}>
    {children}
  </p>
);

// ── Main view ─────────────────────────────────────────────────────────────────
export const HomeView = () => {
  const trpc = useTRPC();
  const { data: usage } = useQuery(trpc.premium.getFreeUsage.queryOptions());
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div style={{ padding: "28px 32px", maxWidth: "960px", margin: "0 auto", width: "100%" }}>

      {/* ── Hero ── */}
      <div style={{
        borderRadius: "16px",
        overflow: "hidden",
        padding: "36px 40px",
        marginBottom: "28px",
        position: "relative",
        background: "linear-gradient(135deg, #0d2b24 0%, #1a3d32 60%, #0f2820 100%)",
      }}>
        {/* radial glow */}
        <div style={{
          position: "absolute",
          top: "-40px", right: "-40px",
          width: "280px", height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          <p style={{ margin: "0 0 6px 0", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            Dashboard
          </p>
          <h1 style={{ margin: "0 0 10px 0", fontSize: "28px", fontWeight: 800, color: "#ffffff", lineHeight: 1.25 }}>
            Welcome back, {firstName} 👋
          </h1>
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "rgba(255,255,255,0.55)", maxWidth: "440px", lineHeight: 1.7 }}>
            Your AI meeting workspace. Start a new meeting, train an agent, or review your activity below.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Button asChild size="sm" style={{ background: "#22c55e", color: "white", fontWeight: 600, borderRadius: "8px", border: "none" }}>
              <Link href="/meetings">
                <VideoIcon style={{ width: "14px", height: "14px", marginRight: "6px" }} />
                New Meeting
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)", color: "white", borderRadius: "8px" }}>
              <Link href="/agents">
                <BotIcon style={{ width: "14px", height: "14px", marginRight: "6px" }} />
                Manage Agents
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Body grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px", alignItems: "start" }}>

        {/* ── Left column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Usage */}
          <div>
            <SectionLabel>Plan Usage</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {usage ? (
                <>
                  <UsagePill label="Meetings" used={usage.meetingCount} max={MAX_FREE_MEETINGS} />
                  <UsagePill label="Agents" used={usage.agentCount} max={MAX_FREE_AGENTS} />
                </>
              ) : (
                <div style={{ borderRadius: "12px", border: "1px solid #e5e7eb", background: "white", padding: "14px 16px", fontSize: "12px", color: "#9ca3af" }}>
                  Loading…
                </div>
              )}
            </div>
          </div>

          {/* Upgrade nudge */}
          <Link href="/upgrade" style={{ textDecoration: "none" }}>
            <div style={{
              borderRadius: "12px",
              border: "1px solid #fcd34d",
              background: "#fffbeb",
              padding: "16px",
              cursor: "pointer",
              transition: "box-shadow 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                <StarIcon style={{ width: "15px", height: "15px", color: "#d97706" }} />
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#b45309" }}>Upgrade Plan</p>
              </div>
              <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#92400e", lineHeight: 1.6 }}>
                Unlock unlimited meetings, agents, and priority AI processing.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 600, color: "#d97706" }}>
                View plans <ArrowRightIcon style={{ width: "12px", height: "12px" }} />
              </div>
            </div>
          </Link>
        </div>

        {/* ── Right column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Quick actions */}
          <div>
            <SectionLabel>Quick Actions</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <ActionCard
                icon={VideoIcon}
                title="Meetings"
                description="Schedule AI-assisted calls with auto-generated summaries and transcripts."
                href="/meetings"
                iconBg="#dcfce7"
                iconColor="#16a34a"
              />
              <ActionCard
                icon={BotIcon}
                title="Agents"
                description="Create and train AI agents that join calls and respond intelligently."
                href="/agents"
                iconBg="#ede9fe"
                iconColor="#7c3aed"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <SectionLabel>Why Talk.AI</SectionLabel>
            <div style={{
              borderRadius: "12px",
              border: "1px solid hsl(var(--border, 220 13% 91%))",
              background: "var(--card, white)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}>
              <Feature icon={BrainCircuitIcon} title="AI-Powered Intelligence" body="Agents understand context and respond live during your calls." />
              <Feature icon={ZapIcon} title="Instant Summaries" body="Structured notes and action items generated right after your call." />
              <Feature icon={ShieldCheckIcon} title="Secure & Private" body="End-to-end encrypted with full data sovereignty." />
              <Feature icon={TrendingUpIcon} title="Always Improving" body="Our models get smarter with every conversation." />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
