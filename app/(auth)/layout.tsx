import {isAuthenticated} from "@/lib/action/action.cooki";
import React from "react";
import {redirect} from "next/navigation";

export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {

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