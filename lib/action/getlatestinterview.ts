import {db} from "@/firebase/admin";

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {


    const {email, limit = 20} = params;


    const interview = await db.collection("interviews")
        .orderBy('createdAt', 'desc').where("finalized", '==', true).where("email", "!=", email).limit(limit).get();


    return interview.docs.map((doc) => (
        {
            id: doc.id,
            ...doc.data()
        })) as Interview[]
}