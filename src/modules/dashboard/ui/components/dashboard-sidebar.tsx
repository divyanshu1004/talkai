"use client"
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { DashboardUserButton } from "./dashboard-user-button";
import { DashboardTrial } from "./dashboard-trial";

const firstSection = [
    { icon: VideoIcon, label: "Meetings", href: "/meetings" },
    { icon: BotIcon,   label: "Agents",   href: "/agents"   },
];

const secondSection = [
    { icon: StarIcon, label: "Upgrade", href: "/upgrade" },
];

// Active/hover style for menu items
const activeStyle: React.CSSProperties = {
    background: "linear-gradient(to right, var(--sidebar-accent) 5%, transparent 100%)",
    border: "1px solid rgba(93,107,104,0.10)",
    borderRadius: "8px",
};
const idleStyle: React.CSSProperties = {
    border: "1px solid transparent",
    borderRadius: "8px",
    background: "transparent",
};

interface NavItemProps {
    icon: React.ElementType;
    label: string;
    href: string;
    active: boolean;
}
const NavItem = ({ icon: Icon, label, href, active }: NavItemProps) => (
    <SidebarMenuItem>
        <Link
            href={href}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                height: "40px",
                padding: "0 10px",
                textDecoration: "none",
                color: "var(--sidebar-foreground)",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                transition: "background 0.15s, border-color 0.15s",
                ...(active ? activeStyle : idleStyle),
            }}
            onMouseEnter={e => {
                if (!active) Object.assign((e.currentTarget as HTMLElement).style, activeStyle);
            }}
            onMouseLeave={e => {
                if (!active) Object.assign((e.currentTarget as HTMLElement).style, idleStyle);
            }}
        >
            <Icon style={{ width: "18px", height: "18px", flexShrink: 0 }} />
            <span>{label}</span>
        </Link>
    </SidebarMenuItem>
);

export const DashboardSidebar = () => {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent-foreground">
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 8px 4px" }}>
                    <Image src="/logo.svg" height={36} width={36} alt="Talk.AI" />
                    <p style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "var(--sidebar-foreground)" }}>
                        Talk.AI
                    </p>
                </Link>
            </SidebarHeader>

            <div style={{ padding: "4px 16px 8px" }}>
                <Separator style={{ opacity: 0.12 }} />
            </div>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <NavItem
                                    key={item.href}
                                    icon={item.icon}
                                    label={item.label}
                                    href={item.href}
                                    active={pathname === item.href}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <div style={{ padding: "4px 16px 8px" }}>
                    <Separator style={{ opacity: 0.12 }} />
                </div>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <NavItem
                                    key={item.href}
                                    icon={item.icon}
                                    label={item.label}
                                    href={item.href}
                                    active={pathname === item.href}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <DashboardTrial />
                <DashboardUserButton />
            </SidebarFooter>
        </Sidebar>
    );
}
