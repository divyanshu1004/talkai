import { authClient } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerDescription,
    DrawerFooter,
} from "@/components/ui/drawer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

// Shared trigger style — replaces border-border/10 bg-white/5 hover:bg-white/10
const triggerStyle: React.CSSProperties = {
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.10)",
    padding: "10px 12px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "rgba(255,255,255,0.05)",
    overflow: "hidden",
    gap: "8px",
    cursor: "pointer",
    transition: "background 0.15s",
};

const UserInfo = ({ name, email, image }: { name: string; email: string; image?: string | null }) => (
    <>
        {image ? (
            <Avatar>
                <AvatarImage src={image} />
            </Avatar>
        ) : (
            <GeneratedAvatar seed={name} variant="initials" className="size-9 mr-3" />
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "left", overflow: "hidden", flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {name}
            </p>
            <p style={{ margin: 0, fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", opacity: 0.7 }}>
                {email}
            </p>
        </div>
        <ChevronDownIcon style={{ width: "15px", height: "15px", flexShrink: 0 }} />
    </>
);

export const DashboardUserButton = () => {
    const router  = useRouter();
    const isMobile = useIsMobile();
    const { data, isPending } = authClient.useSession();

    const onLogout = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/sign-in"),
            },
        });
    };

    if (isPending || !data?.user) return null;

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger
                    style={triggerStyle}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                >
                    <UserInfo name={data.user.name} email={data.user.email} image={data.user.image} />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{data.user.name}</DrawerTitle>
                        <DrawerDescription>{data.user.email}</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button variant="outline" onClick={() => authClient.customer.portal()}>
                            <CreditCardIcon className="size-4" />
                            Billing
                        </Button>
                        <Button variant="outline" onClick={onLogout}>
                            <LogOutIcon className="size-4" />
                            Logout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                style={triggerStyle}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
            >
                <UserInfo name={data.user.name} email={data.user.email} image={data.user.image} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72">
                <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium truncate">{data.user.name}</span>
                        <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => authClient.customer.portal()}
                    className="cursor-pointer flex items-center justify-between"
                >
                    Billing
                    <CreditCardIcon className="size-4" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onLogout}
                    className="cursor-pointer flex items-center justify-between"
                >
                    Logout
                    <LogOutIcon className="size-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
