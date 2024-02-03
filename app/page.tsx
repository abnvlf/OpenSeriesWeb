"use client";

import { Editor } from "@monaco-editor/react";
import { useState } from "react";

export default function Home() {
    const [code, setCode] = useState(`# ==========================================
# Playground Python untuk OpenSeries Library
# ==========================================

import OpenSeries.matematika as matematika
import OpenSeries.fisika as fisika
import OpenSeries.statistika as statistika
import numpy as np

radian = 1
print('radian_ke_derajat', matematika.radian_ke_derajat(radian))

jari = 10
print('luas_lingkaran', matematika.luas_lingkaran(jari))

print('keliling_lingkaran', matematika.keliling_lingkaran(jari))

print('diameter_lingkaran', matematika.diameter_lingkaran(jari))

print('persamaan_kuadrat', matematika.persamaan_kuadrat(1, -3, 2))

waktu = 2.3
jarak = 4
print('kecepatan', fisika.kecepatan(jarak, waktu))

masa_benda = 14
kecepatan_benda = 23.4
print('energi_kinetik', fisika.energi_kinetik(masa_benda, kecepatan_benda))

massa_benda = 14
volume_benda = 8
print('masa_jenis', fisika.masa_jenis(massa_benda, volume_benda))

massa_benda_potensial = 12
gravitasi_bumi = 9.78
ketinggian_benda = 400
print('energi_potensial', fisika.energi_potensial(massa_benda_potensial, gravitasi_bumi, ketinggian_benda))

kuat_arus = 30
hambatan = 3
print('hukum_ohm', fisika.hukum_ohm(kuat_arus, hambatan))

label = [1, 1, 2, 2, 3, 3]
hasil_base_2 = statistika.entropy(label, base=2)
print('entropy', hasil_base_2)

vektor = np.array([1, 2, 3, 4, 5])
hasil = statistika.standar_deviasi(vektor)
print('standar_deviasi', hasil)
`);

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ message: string; result: string; success: boolean }>();
    const [isStartupApi, setIsStartupApi] = useState(false);

    const onRun = async () => {
        setIsLoading(true);

        const timeoutId = setTimeout(() => {
            setIsStartupApi(true);
        }, 5000);

        try {
            const response = await fetch(String(process.env.NEXT_PUBLIC_RUN_API), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ code })
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            clearTimeout(timeoutId);
            setIsLoading(false);
        }
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-50 grid place-items-center ${isStartupApi ? "pointer-events-auto" : "pointer-events-none"}`}
            >
                <div
                    onClick={() => setIsStartupApi(false)}
                    className={`absolute inset-0 bg-zinc-900/40 transition-all duration-300 ${isStartupApi ? "opacity-100" : "opacity-0"}`}
                ></div>
                <div
                    className={`w-full max-w-md space-y-6 rounded-lg bg-white p-12 text-center transition-all duration-300 ${isStartupApi ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}
                >
                    <span className="text-9xl">🥶</span>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold">Wow! Kamu Adalah Superhero!</h1>
                        <p className="text-zinc-600">
                            OpenSeries Playground sedang tertidur sebelumnya! Kamu saat ini sedang membangunkannya!
                            Tolong tunggu beberapa saat sampai dia bangun ya! 😁
                        </p>
                    </div>
                    <button
                        onClick={() => setIsStartupApi(false)}
                        className={`w-full rounded-md bg-indigo-600 px-6 py-2.5 font-medium text-indigo-100`}
                    >
                        Okay
                    </button>
                    <span className="inline-block text-sm text-zinc-400">
                        Hanya orang tertentu yang bisa mendapatkan pesan ini
                    </span>
                </div>
            </div>
            <main className="flex max-h-dvh min-h-dvh flex-col overflow-hidden">
                <header className="flex items-center justify-between border-b px-6 py-2">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-zinc-800">
                            <span className="bg-gradient-to-br from-indigo-600 to-rose-400 bg-clip-text font-bold text-transparent">
                                OpenSeries
                            </span>{" "}
                            Playground
                        </h1>
                        {result?.message && (
                            <span
                                className={`rounded-full px-4 py-1 text-xs font-medium text-white ${result?.success ? "bg-green-600" : "bg-red-600"}`}
                            >
                                {result?.message}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            className={`rounded-md border-2 border-indigo-600 px-6 py-2.5 font-medium text-indigo-600 hover:bg-indigo-100`}
                            onClick={() => alert("blm bisa coy")}
                        >
                            Share
                        </button>
                        <button
                            disabled={isLoading}
                            className={`grid h-12 w-12 place-items-center rounded-md bg-indigo-600`}
                            onClick={onRun}
                        >
                            {isLoading ? (
                                <span className="icon-[ri--loader-3-line] h-6 w-6 animate-spin text-white"></span>
                            ) : (
                                <span className="icon-[iconamoon--player-play] h-6 w-6 text-white"></span>
                            )}
                        </button>
                    </div>
                </header>
                <div className="grid grow grid-cols-2 divide-x overflow-y-auto">
                    <Editor
                        className="h-full"
                        defaultLanguage="python"
                        defaultValue={code}
                        onChange={(val) => setCode(val!)}
                    />
                    <div className="h-full overflow-auto p-8">
                        <h2 className="mb-4 text-xl font-bold text-zinc-800">Output: </h2>
                        <pre className="w-full overflow-auto text-zinc-800">
                            <code>{result?.result}</code>
                        </pre>
                    </div>
                </div>
            </main>
        </>
    );
}
