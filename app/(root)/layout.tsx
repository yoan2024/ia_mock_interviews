import Image from "next/image";
import Link from "next/link";
import {isAuthenticated} from "@/lib/action/action.cooki";
import {redirect} from "next/navigation";


export default async function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {

    const isVerificado = await isAuthenticated();

    if (!isVerificado) {
        redirect("/sign-in");
    }


    return (

        <div className="root-layout">
            <nav className="flex flex-row gap-2 items-center">
                <Image src="/logo.svg" alt="logo" width={40} height={40}/>
                <Link href="/" className=" text-xl">
                    PreWise
                </Link>
            </nav>
            {children}
        </div>


    );
}