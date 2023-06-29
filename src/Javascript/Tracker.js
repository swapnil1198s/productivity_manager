import React, {useState, useEffect} from "react";
import '../CSS/Tracker.css'
import TimeLog from "./TimeLog";
import PieChartComp from "./PieChartComp";

const Tracker = ({setPage}) => {
    const[timerRunning, setTimerRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [log, setLog] = useState([]);
    const [task, setTask] = useState('');
    const [project, setProject] = useState('None');
    const [projectList, setProjectList] = useState(['None']);
    const pieData = log.reduce((acc, logEntry) => {
        const existingProject = acc.find(item => item.name === logEntry.project);
        if (existingProject) {
            existingProject.value += logEntry.time;
        } else {
            acc.push({ name: logEntry.project, value: logEntry.time });
        }
        return acc;
    }, []);
    const handleClick = () =>{
        if(timerRunning===false){
            setTimerRunning(true);
        }
        else{
            setTimerRunning(false);
            setLog(prevLog => [...prevLog, {"time": timer, "task": task, "project":project}]);
            setTimer(0);
        }
    }
    const formatTimer = (timeInSeconds) =>{
        const hours = Math.floor(timeInSeconds/3600); /* Seconds/ 60 / 60 = Seconds/3600 */
        const minutes = Math.floor((timeInSeconds%3600)/60);
        const seconds = Math.floor(timeInSeconds%60)

        const formatNumber = (num) => (num<10 ? `0${num}` : num);

        return `${formatNumber(hours)} : ${formatNumber(minutes)} : ${formatNumber(seconds)}`;
    }

    const handleTaskChange = (event) =>{
        setTask(event.target.value);
    }
    const handleProjectChange = (event) => {
        setProject(event.target.value)
    }
    const addProject = () => {
        const newProject = prompt("Enter Project Name: ");
        if(newProject){
            setProjectList(prevProjectList=> [...prevProjectList, newProject]);
            setProject(newProject);
        }
    }

    useEffect(()=>{
        let interval = null;
        if(timerRunning){
            interval = setInterval(()=>{setTimer((prevTimer)=> prevTimer+1);}, 1000);
        }
        else{
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerRunning]);

    return(
        <div className="tracker">
            <h1 id="title">"Time Is The Seed Of The Universe." <p id="subTitle">~ The Bhagavad Gita</p></h1>
            <div className="ticker">
                <div className="container">
                    {timerRunning===false && <div onClick={handleClick} className="startBtn">
                    </div>}
                    {timerRunning===true && <div onClick={handleClick} className="stopBtn">
                    </div>}
                </div>
                <div className="timer">{formatTimer(timer)}</div>
                {/* <div className="clear" onClick={()=>setTimer(0)}>Clear</div> */}
                <div className="project">
                    <input className="task" type="text" value={task} placeholder="Enter Task Name" onChange={handleTaskChange}/>
                    <select className="projectDdwn" value={project} onChange={handleProjectChange}>
                        {projectList.map((projectName, index)=>(
                            <option key={index} value={projectName}>{projectName}</option>
                        ))}
                    </select>
                    <div className="projectAdd" onClick={addProject}>Add New Project</div>
                </div>
            </div>
            <div className="logContainer">
                <TimeLog log={log} formatTimer={formatTimer}/>
                <div className="pie">
                    <h2 className="pieHead">Project Distribution</h2>
                    <PieChartComp data={pieData}/>
                </div>
            </div>
        </div>
    );
}

export default Tracker;