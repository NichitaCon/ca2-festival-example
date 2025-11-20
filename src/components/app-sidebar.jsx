import * as React from "react";
import { useEffect } from "react";
import {
    IconDashboard,
    IconInnerShadowTop,
    IconConfetti,
    IconTheater,
    IconMicrophone2,
    IconMusic,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: IconDashboard,
        },
        {
            title: "Festivals",
            url: "/festivals",
            icon: IconConfetti,
        },
        {
            title: "Stages",
            url: "#",
            icon: IconTheater,
        },
        {
            title: "Performers",
            url: "#",
            icon: IconMicrophone2,
        },
        {
            title: "Shows",
            url: "#",
            icon: IconMusic,
        },
    ],
};

export function AppSidebar({ onLogin, loggedIn, ...props }) {
    const location = useLocation();
    const message = location.state?.message;
    const type = location.state?.type;

    useEffect(() => {
        if (message) {
            if (type === "success") {
                toast.success(message);
            } else if (type === "error") {
                toast.error(message);
            } else {
                toast(message)
            }

        }
    }, [message]);
    return (
        <>
            <Toaster position="top-center" richColors />

            <Sidebar collapsible="offcanvas" {...props}>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="data-[slot=sidebar-menu-button]:!p-1.5"
                            >
                                <a href="#">
                                    <IconInnerShadowTop className="!size-5" />
                                    <span className="text-base font-semibold">
                                        Acme Inc.
                                    </span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <NavMain items={data.navMain} />
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={data.user} onLogin={onLogin} />
                </SidebarFooter>
            </Sidebar>
        </>
    );
}
