import React from 'react'
import {getRandomInterviewCover} from "@/lib/utils";
import Image from "next/image";
import dayjs from "dayjs";
import Link from 'next/link';
import {Button} from "@/components/ui/button";
import IconsTech from "@/components/IconsTech";

const DisplayCard = ({interviewId, type, createdAt, techstack, userId, role}: InterviewCardProps) => {


    const feedback = null as Feedback | null;
    const isTechnical = /mix/gi.test(type) ? 'Mixed' : type
    const fechaProgramming = dayjs(feedback?.createdAt || createdAt || new Date()).format('YYYY-MM-DD');

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-full">
            <div className="card-interview">
                <div className="flex flex-col">
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-blue-600">

                        <p>{isTechnical}</p>


                    </div>

                    <Image src={getRandomInterviewCover()} alt="random imagen" width={40} height={40}
                           className="rounded-full size-18 mt-5"/>
                    <h1 className="text-xl mt-3">{role}</h1>
                    <div className="mt-3">
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-row gap-2">
                                <div className="flex flex-row gap-2">
                                    <Image src="/calendar.svg" width={15} height={15} alt="calendar"/>
                                    <p>{fechaProgramming}</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Image src="/star.svg" alt="start icon" width={15} height={15}/>
                                    <p>{feedback?.totalScore || '---'}/100</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <p className="line-clamp-2 mt-3">{feedback?.finalAssessment || "You haven't take any interview. Take it now to improve your skills"}</p>


                    <div className="flex flex-row  justify-between mt-6">


                        {/*aqui van los botonoes*/}
                        <IconsTech techStack={techstack}/>
                        <Button className="btn-primary">
                            <Link href={feedback ? `/interview/${interviewId}/feedback` : `/interview/${interviewId} `}>
                                View interview
                            </Link>
                        </Button>
                    </div>


                </div>


            </div>
        </div>
    )
}
export default DisplayCard
