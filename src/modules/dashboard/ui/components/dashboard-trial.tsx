import Link from "next/link";
import { RocketIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import {
    MAX_FREE_AGENTS,
    MAX_FREE_MEETINGS,
} from "@/modules/premium/constants";

export const DashboardTrial = () => {
    const trpc = useTRPC();
    const { data } = useQuery(trpc.premium.getFreeUsage.queryOptions());
    if (!data) return null;

    const agentPct  = Math.min((data.agentCount   / MAX_FREE_AGENTS)   * 100, 100);
    const meetingPct = Math.min((data.meetingCount / MAX_FREE_MEETINGS) * 100, 100);

    return (
        <div style={{
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "8px",
            width: "100%",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 0,
            overflow: "hidden",
        }}>
            {/* Body */}
            <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Title */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <RocketIcon style={{ width: "15px", height: "15px" }} />
                    <p style={{ margin: 0, fontWeight: 500, fontSize: "13px" }}>Free Trial</p>
                </div>

                {/* Agents */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <p style={{ margin: 0, fontSize: "11px" }}>
                        {data.agentCount}/{MAX_FREE_AGENTS} Agents
                    </p>
                    <div style={{ height: "5px", background: "rgba(255,255,255,0.12)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${agentPct}%`, background: "#22c55e", borderRadius: "99px" }} />
                    </div>
                </div>

                {/* Meetings */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <p style={{ margin: 0, fontSize: "11px" }}>
                        {data.meetingCount}/{MAX_FREE_MEETINGS} Meetings
                    </p>
                    <div style={{ height: "5px", background: "rgba(255,255,255,0.12)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${meetingPct}%`, background: "#22c55e", borderRadius: "99px" }} />
                    </div>
                </div>
            </div>

            {/* Upgrade button */}
            <Link
                href="/upgrade"
                style={{
                    display: "block",
                    textAlign: "center",
                    padding: "10px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "inherit",
                    textDecoration: "none",
                    borderTop: "1px solid rgba(255,255,255,0.10)",
                    background: "transparent",
                    transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
                Upgrade Now
            </Link>
        </div>
    );
}