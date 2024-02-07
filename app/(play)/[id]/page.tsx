"use client";

import Codeblock from "@/components/Codeblock";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    params: {
        id: string;
    };
};

const page = ({ params: { id } }: Props) => {
    const [loaded, setLoaded] = useState(false);
    const [result, setResult] = useState();
    const router = useRouter();

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_URL + "/share?id=" + id, {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((r) => {
                setResult(r);
                if (!r?.result) router.replace("/");
                setLoaded(true);
            });
    }, []);

    return <>{loaded ? <Codeblock data={result} /> : "loading..."}</>;
};

export default page;
