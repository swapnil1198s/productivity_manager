import React from "react";
import "../CSS/TimeLog.css"

const TimeLog = ({log, formatTimer}) => {
    return(
        <div className="log">
            <h2 id="logTitle">Time Log</h2>
            <div className="itemList">
                {log.length>0 && [...log].reverse().map((item, index) => (
                    <div className="logItem" key={index}> 
                        <p className="taskName">{item.task}</p>
                        <p className="projectName">{item.project}</p>
                        <p className="taskTime">{formatTimer(item.time)}</p>
                    </div>
                ))}
            </div>                 
        </div>
    );
}

export default TimeLog;