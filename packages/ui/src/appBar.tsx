"use client"

import {signIn, signOut, useSession} from 'next-auth/react'

export default function Appbar(){
    return (
        <div>
            <button onClick={() => {
                signIn()
            }}>Signin</button>
            
            <button onClick={() => {
                signOut()
            }}>Logout</button>
        </div>
    )
}