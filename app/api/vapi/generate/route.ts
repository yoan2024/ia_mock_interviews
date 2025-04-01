import {getRandomInterviewCover} from "@/lib/utils";
import {db} from "@/firebase/admin";
import {getCurrentUser} from "@/lib/action/action.cooki";
import {generateText} from "ai";
import {google} from "@ai-sdk/google";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    try {
        const {type, role, level, techstack, amount, userid} = await request.json();

        console.log("Received data:", {type, role, level, techstack, amount, userid});

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

        console.log("Generated questions:", questions);

        let parsedQuestions;
        try {
            parsedQuestions = JSON.parse(questions.trim());
        } catch (err) {
            console.error("Error parsing questions:", err);
            return NextResponse.json({success: false, error: "Invalid question format"}, {status: 500});
        }

        const user = await getCurrentUser();
        const email = user?.email;

        if (!email) {
            console.error("No email found for user.");
            return NextResponse.json({success: false, error: "User email not found"}, {status: 400});
        }

        const interview = {
            role,
            type,
            level,
            techstack: techstack.split(','),
            questions: parsedQuestions,
            email,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        };

        console.log("Interview data being saved:", interview);

        await db.collection("interviews").add(interview);

        return NextResponse.json({message: "Interview successfully saved", email}, {status: 200});
    } catch (error: any) {
        console.error("ERROR jaajajjaj:", error);
        return NextResponse.json({success: false, error: error.message}, {status: 500});
    }
}


//hola como estas{
var hola = "hola"