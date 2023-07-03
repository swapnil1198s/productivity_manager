import React, {useState, useEffect} from "react";
import '../CSS/Tracker.css';
import TimeLog from "./TimeLog";
import PieChartComp from "./PieChartComp";
import BarChartComp from "./BarChartComp";

const Tracker = ({setPage}) => {
    const dummyLog = [
        {time: 100, task: 'Task A', project:'Project A', Day: 'Monday'},
        {time: 200, task: 'Task A', project:'Project B', Day: 'Tuesday'},
        {time: 350, task: 'Task A', project:'Project A', Day: 'Wednesday'},
        {time: 150, task: 'Task A', project:'Project C', Day: 'Thursday'},
        {time: 2500, task: 'Task A', project:'Project B', Day: 'Friday'},
        {time: 300, task: 'Task A', project:'Project A', Day: 'Saturday'},
        {time: 500, task: 'Task A', project:'Project D', Day: 'Sunday'},
    ];
    
    const[timerRunning, setTimerRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [log, setLog] = useState(dummyLog);
    const [task, setTask] = useState('');
    const [project, setProject] = useState('None');
    const [projectList, setProjectList] = useState(['None']);
    const [day, setDay] = useState('Monday');

    /*Format data for Pie Chart*/
    const pieData = log.reduce((data, logEntry) => {
        const existingProject = data.find(item => item.name === logEntry.project);
        if (existingProject) {
            existingProject.value += logEntry.time;
        } else {
            data.push({ name: logEntry.project, value: logEntry.time });
        }
        return data;
    }, []);

    /* Handler for the start and stop buttons 
        Functionality: 
            1. Toggles timerRunning state (leading to the useEffect function). 
            2. Updates the value of log by adding the most recently recorded task.
            3. Resets the timer to 0 if the stop button is clicked.
    */

    const handleDayChange = (event) => {
        setDay(event.target.value)
    }

    const handleClick = () =>{
        if(!timerRunning){
            setTimerRunning(true);
        }
        else{
            setTimerRunning(false);
            setLog(prevLog => [...prevLog, {time: timer, task: task, project: project, Day: day}]); // Modify log structure
            setTimer(0);
        }
    }
    /* Function for formatting seconds to hh:mm:ss */
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
    /*Handler for Add Project button*/
    const addProject = () => {
        const newProject = prompt("Enter Project Name: ");
        if(newProject){
            setProjectList(prevProjectList=> [...prevProjectList, newProject]);
            setProject(newProject);
        }
    }

    /* Format data for bar graph*/
    const formatDataForBarChart = (logData) => {
        let barChartData = [
          {day: "Monday"},
          {day: "Tuesday"},
          {day: "Wednesday"},
          {day: "Thursday"},
          {day: "Friday"},
          {day: "Saturday"},
          {day: "Sunday"}
        ];
        
        logData.forEach((logEntry) => {
          const dayData = barChartData.find(item => item.day === logEntry.Day);
          if(dayData){
            if(dayData[logEntry.project]){
              dayData[logEntry.project] += logEntry.time;
            } else {
              dayData[logEntry.project] = logEntry.time;
            }
          }
        });
        
        return barChartData;
    };
    /*Function that updates the timer value based on the timerRunning state*/
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

    const barChartData = formatDataForBarChart(log);
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
                      <select className="dayDropdown" value={day} onChange={handleDayChange}>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index)=>(
                            <option key={index} value={day}>{day}</option>
                        ))}
                      </select>
                      <div className="projectAdd" onClick={addProject}>Add New Project</div>
                </div>
            </div>
            {/* The charts based on log data */}
            <div className="logContainer">
                <div className="logRow">
                    <TimeLog log={log} formatTimer={formatTimer}/>
                    <div className="charts">
                        <div className="pieCont">
                            <h2 className="chartHead">Project Distribution</h2>
                            <PieChartComp data={pieData}/>
                        </div>
                    </div>
                </div>
                <div className="barCont">
                    <h2 className="chartHead">Weekly Distribution</h2>
                    <BarChartComp data={barChartData}/>
                </div>
            </div>
        </div>
    );
}

export default Tracker;