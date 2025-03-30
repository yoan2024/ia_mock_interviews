import React from 'react'
import Image from "next/image"
import {cn} from '@/lib/utils'


enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}


const Agent = ({userName}: AgentProps) => {
    const callStatus = CallStatus.FINISHED
    const isSpeaking = true
    const messages = [
        'What is your name?',
        'My name is john Doe, nice to meet you',
    ]

    const lastMessages = messages[messages.length - 1]


    return (
        <>
            <div className="call-view">
                <div className="card-interviewer bg-amber-400">
                    <div className="avatar">
                        <Image src="/ai-avatar.png" alt="vapi" width={66} height={54} className="object-cover"/>
                        {isSpeaking && <span className="animate-speak"/>}
                    </div>
                    <h3>AI interviewer</h3>
                </div>
                <div className="card-border">
                    <div className="card-content">
                        <Image src="/user-avatar.png" alt="vapi" width={66} height={54}
                               className="rounded-full object-cover size-[120px]"/>

                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p key={lastMessages}
                           className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                            {lastMessages}
                        </p>
                    </div>
                </div>
            )}

            <div className="w-full flex justify-center">
                {callStatus !== "ACTIVE" ? (
                    <button className="relative btn-call">
                        <span
                            className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' & 'hidden')}/>

                        <span>
                            {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '...'}

                        </span>
                    </button>
                ) : (
                    <button className="btn-disconnect">
                        End
                    </button>
                )}
            </div>

        </>


    )
}
export default Agent
