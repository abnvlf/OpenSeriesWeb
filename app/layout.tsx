import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "OpenSeries Playground Python: Platform Eksekusi Kode Python",
    description:
        "Jelajahi berbagai kemungkinan dalam pengkodean Python dengan OpenSeries Playground. Platform yang ramah pengguna ini memungkinkan Anda menjalankan dan menguji kode Python dengan mudah, memberikan pengalaman pengkodean yang lancar. Baik Anda seorang pengembang berpengalaman atau baru memulai perjalanan pemrograman, playground kami menawarkan lingkungan dinamis untuk bereksperimen dengan skrip Python."
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
