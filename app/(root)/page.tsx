import React from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {dummyInterviews} from "@/constants";
import DisplayCard from "@/components/DisplayCard";

const Home = () => {
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

                    {dummyInterviews.map((interview) => (
                        <DisplayCard {...interview} key={interview.id}/>
                    ))}
                </div>


            </section>
            <section className="flex flex-col gap-6">
                <h1>Take an interview</h1>
                <div className="interviews-section mt-2">

                    {dummyInterviews.map((interview) => (
                        <DisplayCard {...interview} key={interview.id}/>
                    ))}
                </div>
            </section>
        </>
    )
}
export default Home

