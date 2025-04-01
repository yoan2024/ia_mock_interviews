'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import FormField from "@/components/FormField";
import toast from "react-hot-toast";
import {signUp} from "@/lib/action/action.signup";
import {signIn} from '@/lib/action/action.signin';
import {useRouter} from "next/navigation";

const authForm = ({type}: { type: FormType }) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(2).max(50) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(6),
    })
}


const AuthForm = ({type}: { type: FormType }) => {


    const formSchema = authForm(type)
    const isLogiIn = type === "sign-in";
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            password: "",
            email: "",

        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {

        if (type === "sign-up") {

            const {name, email, password} = values;
            const userRegistrer = await signUp({name, email, password})


            if (!userRegistrer?.success) {
                toast.error(userRegistrer?.message ?? "Undefine mensaje");
                return;
            }


            toast(userRegistrer?.message ?? "Undefine mensaje");
            router.push("/sign-in");

        } else {
            const {email, password} = values;

            const userLoginIn = await signIn({email, password})

            console.log(userLoginIn)
            if (!userLoginIn?.success) {
                toast.error(userLoginIn?.message ?? `${userLoginIn?.message}`);
                return;
            }


            toast(userLoginIn?.message ?? `${userLoginIn?.message}`);
            router.push("/");

        }

    }


    // @ts-ignore
    return (
        <div className="card-border lg:min-w-[556px]">

            <div className="flex flex-col gap-5 card py-9 px-9">
                <div className="flex justify-center gap-1 mt-6 mb-0">
                    <Image
                        src="logo.svg"
                        alt="logo"
                        width={40} height={40}/>
                    <h1 className="text-3xl font-semibold">PrepWise</h1>
                </div>
                <h2 className="text-3xl mx-2 mb-9">Pratice job interviews with Ai</h2>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 form">

                        {!isLogiIn && (

                            <FormField name="name" placeholder="Escribe tu nombre" label="Name"
                                       control={form.control}
                                       type="name"/>
                        )}
                        <FormField name="email" placeholder="Escribe tu correo" label="Name"
                                   control={form.control}
                                   type="email"/>


                        <FormField name="password" placeholder="Escribe tu password" label="Password"
                                   control={form.control}
                                   type="password"/>

                        <Button type="submit" className="btn">Submit</Button>
                    </form>
                </Form>


                <p className="text-center mb-10">
                    {!isLogiIn ? "Tienes cuenta ya" : "No tienes cuenta aun?"}
                </p>
                <Link className="font-semibold ml-1 text-user-primary" href={!isLogiIn ? "/sign-in" : "/sign-up"}>
                    {isLogiIn ? "crea cuenta" : "iniciar sesión"}
                </Link>


            </div>


        </div>
    )
}
export default AuthForm
