import Codeblock from "@/components/Codeblock";
import React from "react";
import { redirect } from "next/navigation";

type Props = {
    params: {
        id: string;
    };
};

const page = async ({ params: { id } }: Props) => {
    const response = await fetch(process.env.NEXT_PUBLIC_URL + "/share?id=" + id, {
        cache: "no-store",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const result = await response.json();

    if (!result.result) redirect("/");

    return <Codeblock data={result} />;
};

export default page;
