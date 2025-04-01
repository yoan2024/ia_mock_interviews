'use server'

import {cookies} from "next/headers";
import {auth, db} from "@/firebase/admin";


const WEEK = 60 * 24 * 7


export async function setCookiUser(idToken: string): Promise<void> {

    const Cookies = await cookies()
    if (Cookies.get('sesion')) {
        return;
    }

    const cooky = await auth.createSessionCookie(idToken, {
        expiresIn: WEEK * 1000,
    })

    Cookies.set('sesion', cooky, {
        httpOnly: true,
        maxAge: WEEK,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "lax",
        path: "/"
    })

    console.log("DEBUG: Cookie creada con éxito:", cooky);
}

[/**/]

export async function getCurrentUser(): Promise<User | null> {


    const cooki = await cookies()

    const cookiValue = cooki.get("sesion")?.value as string

    if (!cookiValue) {
        return null;
    }
    try {
        const decodeClaims = await auth.verifySessionCookie(cookiValue, true)
        const userRecord = await db.collection("users").doc(decodeClaims.uid).get()


        if (!userRecord.exists) {
            //Eliminar la cookie si el usuario no existe en la base de datos
            console.log("el ususario no existe en la firestore su cooki uid no existe en la base de datos")
            cooki.delete("sesion");
            return null;
        }


        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User

    } catch (e: any) {
        cooki.delete("sesion");
        console.log("hubo un error en la funcion de obtener el currentUser de action.cooki")
        return null;
    }

}


export async function getIduser(): Promise<string | null> {
    const user = await getCurrentUser();
    return user?.id || null;
}


export async function isAuthenticated(): Promise<boolean> {
    return !!(await getCurrentUser());
}


export async function daticos() {
    const user = await getCurrentUser();
    const useid = user?.id;

    const querySnapshot = await db
        .collection("interviews")
        .where("userId", "==", useid)
        .get();

    if (querySnapshot.empty) {
        console.log("❌ Documento no encontrado");
        return {user: null};
    }

    // Tomar el primer documento encontrado
    const userRecord = querySnapshot.docs[0].data();

    return {user: userRecord};
}
