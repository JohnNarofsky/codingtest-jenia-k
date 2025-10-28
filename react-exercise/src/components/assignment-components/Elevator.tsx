//import React from 'react'
import Door from './Door';
import Panel from './Panel';

import '../../styles/Assignments.css';

import {FloorRequestType} from './FloorRequestType';
import { useState, useEffect, useRef} from 'react';

interface ElevatorProps {
   panelType: string;
   elevatorPanelButtonConfiguration: string[];
   index: number;
   floorRequest: FloorRequestType;
}

const Elevator = ({panelType="default", elevatorPanelButtonConfiguration, index=0, floorRequest= {floorNumber:-1, direction:""}}: ElevatorProps) => {

const [isMoving, setIsMoving] = useState(false);
const [destinationQueue, setDestinationQueue] = useState<number[]>(() => []);
const [elevatorID, setElevatorID] = useState("");
const [doorStatus, setDoorStatus] = useState("CLOSED");

const currentDirectionRef = useRef("");
const currentFloorRef = useRef(1);
const previousFloorRef = useRef(-1);
const targetFloorRef = useRef(-1);
const currentMoveTimeoutRef = useRef(-1);
const destinationQueueRef = useRef<number[]>([]);

useEffect(() => {
    setElevatorID(`Elevator # ${index + 1}`);
}, [index]);

useEffect(() => {
    if (floorRequest?.floorNumber !== undefined && floorRequest?.floorNumber > 0 &&  floorRequest?.direction !== "") {
        destinationQueueRef.current.push(floorRequest.floorNumber);
        setDestinationQueue(prevQueue => [...prevQueue, floorRequest.floorNumber]);  
    }
}, [floorRequest]);

const move = () => {
  const destinationFloor:number = destinationQueueRef.current[0]; 

  if (currentFloorRef.current === destinationFloor){
      destinationQueueRef.current = (destinationQueueRef.current.length > 1) ? destinationQueueRef.current.slice(1) : [];
      if (destinationQueue.length > 1 ) { setDestinationQueue(prevQueue => prevQueue.slice(1)) } else { setDestinationQueue([]);}
      handleArrival();
  } else {
    const currFloor = currentFloorRef.current;
    const direction =  currFloor < destinationFloor ? "up" : currFloor > destinationFloor ? "down" : "";
    if (direction !== "" ) {
        setIsMoving(() => true);
  
        let target = currFloor;
        if (direction === "up"){
          target++;
        }
        if (direction == "down"){
          target--;
        }
        currentFloorRef.current = target
        targetFloorRef.current = destinationFloor;
        previousFloorRef.current = currFloor;
        currentDirectionRef.current = direction;

        const timeoutId = setTimeout(() => {
          move();
        }, 3000);
        currentMoveTimeoutRef.current = timeoutId;
    }
  }
};

useEffect(() => {
  if (!isMoving && destinationQueue.length > 0){
      move();
  }
}, [destinationQueue.length , isMoving]);  

const handleArrival = () => {
    clearTimeout(currentMoveTimeoutRef.current);
    setTimeout(() => {
        setTimeout(() => {
            setDoorStatus(() => "OPENING");
            setTimeout(() => {
                setDoorStatus(() => "OPEN");
                setTimeout(() => {
                    setDoorStatus(() => "CLOSING");
                    setTimeout(() => {
                        setDoorStatus(() => "CLOSED");
                        if (destinationQueueRef.current.length > 0 || destinationQueue.length > 0 )  {
                            move();
                        }
                    }, 3000);
                }, 3000);
            }, 3000);
        }, 3000);
        setIsMoving(false); 
    }, 3000);
};

const handleDestination  = (data:number) => {
    if (data > 0) {
      if (!destinationQueue.includes(data)) {
         setDestinationQueue(prevQueue => [...prevQueue, data]);
      }
      if (!destinationQueueRef.current.includes(data)) {
         destinationQueueRef.current.push(data);
      }
    }
};

  return (
    <div className="elevator">
      <h1>{elevatorID}</h1>
      <div className="elevator-panel">
       Panel: 
       <Panel  floorNumber={-1} panelType={panelType} panelButtonConfiguration={elevatorPanelButtonConfiguration} destination={handleDestination} />
      </div> 
      <Door  doorStatus={doorStatus} />
      <div className="status">
          <span>{isMoving ? `CURRENT FLOOR IS ${previousFloorRef.current}.` : `CURRENT FLOOR IS ${currentFloorRef.current}.`}</span> &nbsp;&nbsp;
          <span>{isMoving && currentDirectionRef.current === 'up' ? `ASCENDING TO FLOOR ${targetFloorRef.current}.` : ''}</span>
          <span>{isMoving && currentDirectionRef.current === 'down' ? `DESCENDING TO FLOOR ${targetFloorRef.current}.` : ''}</span>
      </div>

        <div>QUEUED FLOORS:</div>
        <div className="queue">
             {destinationQueue.map (destination => {
                return (
                  <div> {destination}</div>
                )
             })
             }
        </div>
    </div>
  )
}

Elevator.defaultProps = {
  panelType: "default",
  index: 0,
  floorRequest: {}
};


export default Elevator
