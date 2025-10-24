import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
    const { pathname } = useLocation();

    const getBackground = () => {
        if (pathname.startsWith("/category/PS5")) return "#213547"; 
        if (pathname.startsWith("/category/Switch")) return "#65000f";
        return "#1e1e1e"; 
    };

    useEffect(() => {
        const color = getBackground();
        document.body.style.transition = "background-color 0.4s ease";
        document.body.style.backgroundColor = color;
    }, [pathname]);

    return <Outlet />;
}
