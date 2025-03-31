import {isAuthenticated} from "@/lib/action/action.cooki";
import React from "react";
import {redirect} from "next/navigation";

export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {


    console.log("Server  Google API Key:", process.env.DEEPSEEK_API_KEY);


    const isVerificated = await isAuthenticated();

    if (isVerificated) {
        redirect("/");
    }


    return (

        <div className="auth-layout">

            {children}

        </div>

    );
}