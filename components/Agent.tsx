'use client'

import React, {useEffect, useState} from 'react'
import Image from "next/image"
import {cn} from '@/lib/utils'
import {useRouter} from "next/navigation";
import {vapi} from "@/lib/vapi.sdk"


enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    CONNECTED = "CONNECTED",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}


interface SavedMessage {
    role: 'user' | 'system' | 'assistant';
    content: string;
}


const Agent = ({userName, userId, type}: AgentProps) => {

    const router = useRouter();
    
    const [isSpeaking, setSpeaking] = useState(false)
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [messages, setMessage] = useState<SavedMessage[]>([])


    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED)
        }


        const onMessage = (message: Message) => {


            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = {role: message.role, content: message.transcript}
                setMessage((prev) => [...prev, newMessage])
            }


        }


        const onSpeechStart = () => setSpeaking(true)
        const onSpeechEnd = () => setSpeaking(false)

        const onError = (error: Error) => console.log('Error', error)


        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)
        vapi.on('error', onError)

        return () => {

            vapi.off('call-start', onCallStart)
            vapi.off('call-end', onCallEnd)
            vapi.off('message', onMessage)
            vapi.off('speech-start', onSpeechStart)
            vapi.off('speech-end', onSpeechEnd)
            vapi.off('error', onError)


        }

    }, [])


    useEffect(() => {
        if (callStatus === CallStatus.FINISHED) router.push('/')


    }, [messages, callStatus, type, userId]);


    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)
        try {
            await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
                variableValues: {
                    userName: userName,
                    userId: userId,
                }
            })

        } catch (e: any) {

            console.log(e)
        }
    }


    const handleDisconnect = async () => {

        setCallStatus(CallStatus.FINISHED)

        vapi.stop()
    }


    const LATESTMessages = messages[messages.length - 1]?.content


    const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
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
                        <p
                            className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                            {LATESTMessages}
                        </p>

                    </div>
                </div>
            )}

            <div className="w-full flex justify-center">
                {callStatus !== "ACTIVE" ? (
                    <button className="relative btn-call" onClick={handleCall}>
                        <span
                            className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' && 'hidden')}/>

                        <span>
                            {isCallInactiveOrFinished ? 'Call' : '...'}

                        </span>
                    </button>
                ) : (
                    <button className="btn-disconnect" onClick={handleDisconnect}>
                        End
                    </button>
                )}
            </div>

        </>


    )
}
export default Agent
