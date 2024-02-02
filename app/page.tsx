"use client";

import ReactCodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { python } from "@codemirror/lang-python";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";

export default function Home() {
    const [code, setCode] = useState(`import OpenSeries.matematika as matematika

radian = 1
print(matematika.radian_ke_derajat(radian))
# 57,296
`);

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ message: string; result: string; success: boolean }>();

    const onChange = useCallback((val: string) => {
        setCode(val);
    }, []);

    const onRun = async () => {
        setIsLoading(true);

        const response = await fetch(String(process.env.NEXT_PUBLIC_RUN_API), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        });

        const data = await response.json();
        setResult(data);
        setIsLoading(false);
    };

    return (
        <main className="flex max-h-dvh min-h-dvh flex-col overflow-hidden">
            <header className="flex items-center justify-between border-b border-b-gray-600 bg-[#24283B] px-6 py-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-white">
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
                <div className="flex items-center gap-2">
                    <button
                        className="rounded-md bg-fuchsia-600 px-8 py-3 font-medium text-white"
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6 animate-spin stroke-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6 stroke-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </header>
            <div className="grid grow grid-cols-2 divide-x divide-gray-600 overflow-y-auto">
                <ReactCodeMirror
                    value={code}
                    theme={tokyoNightStorm}
                    className="h-full overflow-auto bg-[#24283B]"
                    extensions={[python()]}
                    onChange={onChange}
                />
                <div className="h-full overflow-auto bg-[#24283B] p-8">
                    <h2 className="mb-4 text-xl font-bold text-white">Output: </h2>
                    <pre className="w-full overflow-auto text-white">
                        <code>{result?.result}</code>
                    </pre>
                </div>
            </div>
        </main>
    );
}
