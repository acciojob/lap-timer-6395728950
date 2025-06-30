import React, { useEffect, useRef, useState } from 'react'

const Timinng = (props) => {
    
    const [time,setTime] = useState(0);
    const [lap,setLap] = useState([]);
    const[isruning,setIsruning]  = useState(false);
     

    const startTimeref = useRef(null);
    const intervalTimeref  = useRef(null);
    const handlestart = ()=>{
       console.log("button is clicked")
       if(!isruning){
        setIsruning(true);
        startTimeref.current = Date.now()-time;
        intervalTimeref.current = setInterval(()=>{
            setTime(Date.now()-startTimeref.current);
        },10);

       }

    };

    const handlestop = ()=>{
   console.log("button is clicked")
     if(isruning){
        clearInterval(intervalTimeref.current);
        setIsruning(false);
     }
    }
    const handlelap = ()=>{
        console.log("button is clicked")
        const currentlaptime = formatTime(time);
        setLap([...lap,currentlaptime]);
        console.log('what is come in currentlaptime',currentlaptime);
        console.log("all lap time",lap);
    }
    const handlereset = ()=>{
        console.log("button is clicked")
        clearInterval(intervalTimeref.current);
        setIsruning(false);
        setTime(0);
        setLap([]);
      
         
        
    }


    useEffect(() => {
        return () => clearInterval(intervalTimeRef.current);
    }, []);
    const formatTime = (ms) => {
        const totalCentiseconds = Math.floor(ms / 10);
        const centiseconds = String(totalCentiseconds % 100).padStart(2, "0");
        const totalSeconds = Math.floor(totalCentiseconds / 100);
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    
        return `${minutes}:${seconds}:${centiseconds}`;
      };
  return (
    <div>
        <p>{formatTime(time)}</p>
      
        <button onClick={handlestart}>Start</button>
        <button onClick={handlestop}>Stop</button>
        <button onClick={handlelap}>Lap</button>
        <button onClick={handlereset}>Reset</button>

        <ul>
                {lap.map((lap, index) => (
                    <li key={index}>{lap}</li> // Display each lap time
                ))}
            </ul>
    </div>
  )
}

export default Timinng