import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useState, useEffect } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";

// import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import FestivalsIndex from "./pages/festivals/Index";
import ShowFestival from "./pages/festivals/Show";
import FestivalsCreate from "./pages/festivals/Create";
import FestivalsEdit from "./pages/festivals/Edit";

export default function App() {
    const [loggedIn, setLoggedin] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token) {
            console.log("Useeffect in app set login to true");
            setLoggedin(true);
        }
    }, []);

    const onLogin = (authState, token) => {
        setLoggedin(authState);
        if (authState) {
            console.log("auth is true");
            localStorage.setItem("token", token);
        } else {
            console.warn("auth is false");
            localStorage.removeItem("token");
        }
    };

    return (
        <Router>
            <SidebarProvider
                style={{
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                }}
            >
                <AppSidebar
                    variant="inset"
                    onLogin={onLogin}
                    loggedIn={loggedIn}
                />
                <SidebarInset>
                    <SiteHeader />
                    {/* <Navbar onLogin={onLogin} loggedIn={loggedIn} /> */}

                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                                {/* Main content */}
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <Home
                                                onLogin={onLogin}
                                                loggedIn={loggedIn}
                                            />
                                        }
                                    />

                                    <Route
                                        path="/festivals"
                                        element={<FestivalsIndex />}
                                    />
                                    <Route
                                        path="/festivals/:id"
                                        element={
                                            <ShowFestival loggedIn={loggedIn} />
                                        }
                                    />
                                    <Route
                                        path="/festivals/:id/edit"
                                        element={<FestivalsEdit />}
                                    />
                                    <Route
                                        path="/festivals/create"
                                        element={<FestivalsCreate />}
                                    />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </Router>
    );
}
