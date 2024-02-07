"use client";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { usePython } from "react-py";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
    data?: {
        data?: {
            code?: string;
            id?: string;
        };
        result?: boolean;
        message?: string;
    };
};

const Codeblock = ({ data }: Props) => {
    const [code, setCode] = useState(data?.data?.code);

    const { runPython, stdout, stderr, isLoading, isRunning } = usePython();
    const { theme, systemTheme } = useTheme();
    const [shared, setShared] = useState<{
        data?: {
            code?: string;
            id?: string;
        };
        result?: boolean;
        message?: string;
    }>({ ...data });
    const [prev, setPrev] = useState<typeof shared>({ ...data });
    const currentTheme = theme === "system" ? systemTheme : theme;
    const router = useRouter();

    const onShare = async () => {
        const response = await fetch("/share", {
            cache: "no-store",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        });

        const result = await response.json();

        setShared(result);
        setPrev(prev);

        router.replace("/" + result.data.id);
    };

    const onChange = (v: string | undefined, event: any) => {
        setCode(v!);

        if (v != data?.data?.code) {
            setShared({});
        } else {
            setShared(prev);
        }
    };

    const onCopy = () => {
        toast.success("Link berhasil disalin!");
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_URL + "/" + shared.data?.id!);
    };

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
                    <div className="flex items-center gap-2">
                        <ThemeSwitcher />
                        {shared?.result ? (
                            <div className="flex items-center gap-2">
                                <span className="text-sm">.../{shared.data?.id}</span>
                                <button
                                    onClick={onCopy}
                                    className="grid h-12 w-12 place-items-center rounded-md border-2 border-indigo-600 "
                                >
                                    <span className="icon-[heroicons-outline--clipboard-copy] h-6 w-6 text-indigo-600 dark:text-white"></span>
                                </button>
                            </div>
                        ) : (
                            <button
                                className={`rounded-md border-2 border-indigo-600 px-6 py-2.5 font-medium text-indigo-600 transition-all duration-200 hover:bg-indigo-600/20 dark:border-indigo-500 dark:text-indigo-400`}
                                onClick={onShare}
                            >
                                Share
                            </button>
                        )}
                        <button
                            disabled={isLoading || isRunning}
                            className={`grid h-12 w-12 place-items-center rounded-md bg-indigo-600 dark:bg-indigo-500`}
                            onClick={(e) => {
                                e.preventDefault();
                                runPython(String(code));
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
                        theme={currentTheme === "dark" ? "vs-dark" : "vs-light"}
                        onChange={onChange}
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
};

export default Codeblock;
