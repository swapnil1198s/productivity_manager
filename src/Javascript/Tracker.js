import React, {useState, useEffect} from "react";
import '../CSS/Tracker.css'

const Tracker = ({setPage}) => {
    const[btnState, setBtnState] = useState('stopped')
    return(
        <div className="tracker">
            <div className="container">
                {btnState==='stopped' && <div onClick={()=>setBtnState('started')} className="startBtn">
                </div>}
                {btnState==='started' && <div onClick={()=>setBtnState('stopped')} className="stopBtn">
                </div>}
            </div>
        </div>
    );
}

export default Tracker;