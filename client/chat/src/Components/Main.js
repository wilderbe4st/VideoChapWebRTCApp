import React,{useEffect} from 'react'

import Chat from './Chat'
import Video from './Video'

export default function Main() {
    
    return (
        <div className="container">
        <div className="row">
            <div className="col-6"><Chat/></div>
            <div className="col-6"><Video/> </div>
        </div>
            
        </div>
    )
}
