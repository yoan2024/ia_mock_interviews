'use server'


import {createUserWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/firebase/client";
import {db} from "@/firebase/admin";


export async function signUp(params: SignUpParams) {

    const {name, email, password} = params;
    if (!name?.trim()) {
        return {success: false, message: 'Name cannot be empty'};
    }
    try {


        const credenciales = await createUserWithEmailAndPassword(auth, email, password);


        const uid = credenciales.user.uid


        const userUid = await db.collection('users').doc(credenciales.user.uid).get()

        if (userUid.exists) {
            return {
                success: false,
                message: "usuario ya existe ya fue creado antes, en la base de datos"
            }
        }


        await db.collection('users').doc(uid).set({
            name,
            email,
            password,
            createdAt: new Date().toLocaleString(),
            userid: userUid.id
        })


        return {
            success: true,
            message: "Account created successfully. Please sign in"
        }


    } catch (e: any) {

        console.log("error al crear ussuario", e)
        if (e.code === "auth/email-already-in-use") {
            return {success: false, message: "Email already in use."}
        }
        if (e.code === "auth/weak-password") {
            return {success: false, message: "Password weak"}
        }
        return {success: false, message: "Error creating user"}
    }


}


