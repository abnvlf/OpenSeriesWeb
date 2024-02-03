import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
            <body className={inter.className}>{children}</body>
        </html>
    );
}
