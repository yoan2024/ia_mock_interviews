import {db} from "@/firebase/admin";


export async function getInterviewByUserId(email: any): Promise<Interview[] | null> {
    const interview = await db.collection("interviews").where("email", '==', email).get();


    return interview.docs.map((doc) => (
        {
            id: doc.id,
            ...doc.data()
        })) as Interview[]


}