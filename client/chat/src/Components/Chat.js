import React,{useEffect,useState} from 'react'
import openSocket from 'socket.io-client'
const socket =openSocket("http://localhost:3001/");

export default function Chat() {
    const [messageList, setMessageList] = useState([{user:"test",message:"test message"},{user:"test2",message:"test message2"}]);
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");

    const sendMessage=()=>{
        socket.emit("message",{user,message});
    }

    useEffect(() => {        
        console.log("working");
        socket.on("newmessage",data=>{
            setMessageList([...messageList,{user:data.user,message:data.message}]);
        })
        
    },);
    
    return (
        <div  className="bg-success ">
        <div className="row py-5 text-left px-3">
            {messageList.map((m,i)=>(
                <div className="col-12">
                <div className="row">
                    <div className="col-2">
                    {m.user}
                    </div>
                    <div className="col">
                    {m.message}
                    </div>
                </div>
                </div>
            ))}
        </div>
        <div className="row mt-5 mx-4">
            <div className="col ">
                <form>
                    <div className="form-group my-4">
                    <label for="username">username</label>
                    <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} className="form-control" id="username" placeholder="username"/>
                    </div>
                    <div className="form-group">
                    <label for="message">message</label>
                    <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} className="form-control" id="message" placeholder="message"/>
                    </div>
                </form>
            </div>
        </div>
        <div className="row p-2">
        <div className="col">
            <button type="button" onClick={sendMessage} className="btn btn-primary">Send</button></div>
        </div>

            
        </div>
    )
}
