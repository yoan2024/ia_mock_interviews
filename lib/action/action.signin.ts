'use server'
import {auth} from "@/firebase/client";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {setCookiUser} from '@/lib/action/action.cooki';

export async function signIn(params: SignInParams) {

    const {email, password} = params;

    try {

        const recorder = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await recorder.user.getIdToken()


        await setCookiUser(idToken)

        return {success: true, message: 'Sign in Successfully'};
    } catch (e: any) {
        if (e.code === "auth/user-not-found") {
            return {
                success: false,
                message: "User not found",
            }
        } else if (e.code === "auth/wrong-password") {
            return {
                success: false,
                message: "Wrong password",
            }
        } else if (e.code === "auth/invalid-email") {
            return {
                success: false,
                message: "Invalid email",
            }
        }

        return {
            success: false,
            message: `Invalid email or password   ${e.message} `,
        }
    }
}