import React from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {dummyInterviews} from "@/constants";
import DisplayCard from "@/components/DisplayCard";
import {daticos, getCurrentUser} from "@/lib/action/action.cooki";
import {db} from "@/firebase/admin";
import {getInterviewByUserId} from '@/lib/action/getinterviews';
import {getLatestInterviews} from "@/lib/action/getlatestinterview";


const Home = async () => {

    const user = await getCurrentUser();
    
    const [interviews, latestinterviews] = await Promise.all([
        await getInterviewByUserId({email: user?.email}),
        await getLatestInterviews({email: user?.email})
    ])


    const hasPastInterviews = interviews?.length > 0
    const hasUpcomingInterviews = latestinterviews?.length > 0


    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h1 className="font-semibold text-4xl">Get interview-Ready with AI-Powered Practice & Feedback</h1>
                    <p className="text-2xl">Pratice on real interview questions & get instant feedback</p>
                    <Button className="btn-primary max-sm:w-full">
                        Start an interview
                        <Link href="/">

                        </Link>
                    </Button>
                </div>
                <Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden"/>

            </section>


            <section>
                <h1 className="font-semibold text-2xl">Your interviews</h1>
                <div className="interviews-section mt-4">


                    {hasPastInterviews ? (
                        interviews?.map((interview) => (
                            <DisplayCard {...interview} key={interview.id}/>
                        ))
                    ) : (
                        <p>You haven't take any interviews yet</p>
                    )}

                </div>


            </section>
            <section className="flex flex-col gap-6">
                <h1>Take an interview</h1>
                <div className="interviews-section mt-2">
                    {hasUpcomingInterviews ? (
                        latestinterviews?.map((interview) => (
                            <DisplayCard {...interview} key={interview.id}/>
                        ))
                    ) : (
                        <p>There are no interviews available</p>
                    )}
                </div>
            </section>
        </>
    )
}
export default Home

