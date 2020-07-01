import React,{useEffect} from 'react'
import openSocket from 'socket.io-client'

export default function Main() {
    useEffect(() => {        
        console.log("working");
        const socket =openSocket("http://localhost:3001/");
    }, );
    return (
        <div>
            <h1>Main</h1>
        </div>
    )
}
