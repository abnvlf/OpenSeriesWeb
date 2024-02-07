"use client";

import { useTheme } from "next-themes";
import { ReactNode } from "react";
import { PythonProvider } from "react-py";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    const { theme } = useTheme();

    const packages = {
        micropip: ["OpenSeriesBellshade"]
    };

    return (
        <PythonProvider packages={packages}>
            {children}
            <ToastContainer position="bottom-right" draggable theme={theme} />
        </PythonProvider>
    );
};

export default Layout;
