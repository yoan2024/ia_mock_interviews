import {initializeApp, cert, getApps,} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";
import {getAuth} from "firebase-admin/auth";

function inicializarProjectoFirebase() {

    const apps = getApps()


    if (!apps.length) {
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,  //resolviendo bug de la varibale
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            })
        })
    }

    return {
        auth: getAuth(),
        db: getFirestore(),
    }


}

export const {auth, db} = inicializarProjectoFirebase();




