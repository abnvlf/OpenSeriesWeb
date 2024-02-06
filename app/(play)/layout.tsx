"use client";

import { ReactNode } from "react";
import { PythonProvider } from "react-py";

type Props = {
    children: ReactNode;
};

const Layout = ({ children }: Props) => {
    const packages = {
        micropip: ["OpenSeriesBellshade"]
    };

    return <PythonProvider packages={packages}>{children}</PythonProvider>;
};

export default Layout;
