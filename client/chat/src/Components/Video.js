import React,{useEffect,useState} from 'react'
import Peer from 'peerjs'
const peer = new Peer( {
    host: 'localhost',
    port: 3001,
    path: '/peerjs/myapp'
  });

export default function Video() {
    const [localStream, setLocalStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [lid, setLid] = useState("")
    const [rid, setRid] = useState("");
    const initialise=()=>{
        let video= document.getElementById("Lvideo")
        navigator.mediaDevices.getUserMedia({video:true,audio:false}).then(stream=>{
            video.srcObject=stream;
            setLocalStream(stream);
            video.play();
        }).catch(err=>{
            console.log(err);
        })
        let width=320;
        let height=video.videoHeight/video.videoWidht*width;
        video.setAttribute('width',width)
        video.setAttribute('height',height)

    }
    const Connection=()=>{
        peer.on('connection',conn=>{
            conn.on('open', function() {
                // Receive messages
                conn.on('data', function(data) {
                  console.log('Received from sendee', data);
                });
              
                // Send messages
                conn.send('Hello!');
              });
        })
        let video= document.getElementById("Rvideo")
        let localvideo= document.getElementById("Lvideo")
        peer.on('call', function(call) {
            navigator.mediaDevices.getUserMedia({video:true,audio:false}).then(lstream=>{
                call.answer(lstream);
                call.on('stream',stream=>{
                video.srcObject=stream;
                video.play();
            })
            })
            // Answer the call, providing our mediaStream
            
          });
    }
    const peerConnect=()=>{
        let conn = peer.connect(rid);
        conn.on('open', function() {
            // Receive messages
            conn.on('data', function(data) {
              console.log('Received', data);
            });
          
            // Send messages
            conn.send('Hola!');
          });
          let video= document.getElementById("Rvideo")
          var call = peer.call(rid,
            localStream);
            call.on('stream',stream=>{
                console.log("callee vidoe")
                video.srcObject=stream;
                video.play();
            })
    }
    useEffect(()=>{
        // console.log(peer);
        initialise();
        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
            setLid(id);
          });
          Connection();
    },[])
    return (
        <div className="bg-danger p-3">
            <div className=" py-2">Video</div>
            <div class="camera ">
            <div>Lid:{lid}</div>
                <video id="Lvideo">Video stream not available.</video>
                <div>Rid:{rid}</div>
                <video id="Rvideo">Video stream not available.</video>
                <label>Remote Id</label>
                <input type="text" value={rid} onChange={(e)=>setRid(e.target.value)} />
                <button type="button" onClick={()=>{peerConnect()}} className="btn btn-primary" id="startbutton">Connect</button>
            </div>
        </div>
    )
}
