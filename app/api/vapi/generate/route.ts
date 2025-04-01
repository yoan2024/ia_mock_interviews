import {getRandomInterviewCover} from "@/lib/utils";
import {db} from "@/firebase/admin";
import {getCurrentUser} from "@/lib/action/action.cooki";
import {generateText} from "ai";
import {google} from "@ai-sdk/google";

export async function POST(request: Request) {
    const {type, role, level, techstack, amount} = await request.json();

    // Intentamos obtener el usuario desde la cookie
    const usuario = await getCurrentUser();

    // 🔥 Agregamos logs de depuración
    console.log("DEBUG: Usuario obtenido:", usuario);

    // Obtenemos el ID del usuario
    const iduser = usuario?.id || null;
    console.log("DEBUG: ID del usuario:", iduser);
////

    if (!iduser) {
        console.error("ERROR: No se pudo obtener el ID del usuario. Verifica la cookie de sesión.");
        return Response.json({success: false, error: "No se pudo obtener el usuario."}, {status: 401});
    }

    try {
        const {text: questions} = await generateText({
            model: google('gemini-2.0-flash-001'),
            prompt: `Prepare questions for a job interview.
            The job role is ${role}.
            The job experience level is ${level}.
            The tech stack used in the job is: ${techstack}.
            The focus between behavioural and technical questions should lean towards: ${type}.
            The amount of questions required is: ${amount}.
            Please return only the questions, without any additional text.
            Return the questions formatted like this:
            ["Question 1", "Question 2", "Question 3"]`
        });

        const interview = {
            role,
            type,
            level,
            techstack: techstack.split(','),
            questions: JSON.parse(questions),
            userId: iduser,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createAt: new Date().toISOString(),
        };

        console.log("DEBUG: Datos a guardar en Firestore:", interview);

        await db.collection("interviews").add(interview);

        return Response.json({success: true}, {status: 200});
    } catch (error) {
        console.error("ERROR:", error);
        return Response.json({success: false, error}, {status: 500});
    }
}
