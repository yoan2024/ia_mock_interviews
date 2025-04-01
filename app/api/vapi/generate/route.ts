import {getRandomInterviewCover} from "@/lib/utils";
import {db} from "@/firebase/admin";
import {getCurrentUser, getIduser} from "@/lib/action/action.cooki";
import {generateText} from "ai";
import {google} from "@ai-sdk/google";


export async function POST(request: Request) {
    const {type, role, level, techstack, amount, userid} = await request.json();
    const user = await getCurrentUser();
    const email = user?.email


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
            email: email,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        };

        await db.collection("interviews").add(interview);

        return Response.json({message: "todo salio correcto", email: email}, {status: 200,});
    } catch (error) {
        console.error("ERROR:", error);
        return Response.json({success: false, error: error}, {status: 500});
    }
}
