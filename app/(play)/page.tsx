"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { usePython } from "react-py";
import { useTheme } from "next-themes";

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

    const { runPython, stdout, stderr, isLoading, isRunning } = usePython();
    const { theme } = useTheme();

    return (
        <>
            <div
                className={`absolute inset-0 z-20 grid place-items-center bg-white transition-all duration-200 dark:bg-zinc-900 ${isLoading ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
                <span className="flex items-center gap-2 text-xl font-bold text-zinc-600 dark:text-zinc-400">
                    <span className="icon-[tabler--loader] animate-spin text-2xl"></span>
                    Loading Environment
                </span>
            </div>
            <main className="flex max-h-dvh min-h-dvh flex-col overflow-hidden dark:bg-[#1E1E1E]">
                <header className="flex items-center justify-between border-b px-6 py-2 dark:border-zinc-700">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">
                            <span className="bg-gradient-to-br from-indigo-600 to-rose-400 bg-clip-text font-bold text-transparent">
                                OpenSeries
                            </span>{" "}
                            Playground
                        </h1>
                    </div>
                    <div className="flex items-center gap-1">
                        <ThemeSwitcher />
                        <button
                            className={`rounded-md border-2 border-indigo-600 px-6 py-2.5 font-medium text-indigo-600 transition-all duration-200 hover:bg-indigo-600/20 dark:border-indigo-500 dark:text-indigo-400`}
                            onClick={() => alert("blm bisa coy")}
                        >
                            Share
                        </button>
                        <button
                            disabled={isLoading || isRunning}
                            className={`grid h-12 w-12 place-items-center rounded-md bg-indigo-600 dark:bg-indigo-500`}
                            onClick={(e) => {
                                e.preventDefault();
                                runPython(code);
                            }}
                        >
                            {isRunning ? (
                                <span className="icon-[ri--loader-3-line] h-6 w-6 animate-spin text-white"></span>
                            ) : (
                                <span className="icon-[iconamoon--player-play] h-6 w-6 text-white"></span>
                            )}
                        </button>
                    </div>
                </header>
                <div className="grid grow grid-cols-2 divide-x overflow-y-auto dark:divide-zinc-700">
                    <Editor
                        className="h-full"
                        defaultLanguage="python"
                        defaultValue={code}
                        theme={theme === "dark" ? "vs-dark" : "vs-light"}
                        onChange={(val) => setCode(val!)}
                    />
                    <div className="relative flex h-full overflow-auto p-8">
                        <pre>
                            <code>
                                {!stdout && !stderr && !isRunning ? <p>Jalankan kodenya untuk melihat output</p> : null}
                                {stdout}
                                {stderr}
                            </code>
                        </pre>
                        {isRunning && <span className="icon-[ri--loader-3-line] m-auto animate-spin text-2xl"></span>}
                    </div>
                </div>
            </main>
        </>
    );
}
