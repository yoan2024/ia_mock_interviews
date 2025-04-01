import React from 'react'
import Agent from "@/components/Agent";
import {getCurrentUser} from "@/lib/action/action.cooki";

const Page = async () => {


    return (
        <>

            <h3>Interview Generation</h3>
            <Agent userName={user?.name} userId={user?.id} type="generate"/>
        </>
    )
}
export default Page
