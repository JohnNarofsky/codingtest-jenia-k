//import React from 'react'
import { useEffect, useState } from 'react';

import Floor from './Floor.tsx';
import Elevator from './Elevator.tsx';

import '../../styles/Assignments.css';

type ElevatorsType = {
    floors: number[];
}[]

interface ElevatorBankProps {
    elevatorData: { 
        floors: number;
        elevators: {
            floors: {
                start: number;
                end:number
            }[]
        } []
    };
}

const ElevatorBank = ( props: ElevatorBankProps) => {
  
   const [floors, setFloors] = useState<number[]>([]);
   const [elevators, setElevators] = useState<ElevatorsType>([]);
   const [floorRequest, setFloorRequest] = useState ({floorNumber: 1, direction:""});

   useEffect(() => {
    const setupFloors: number[] = Array.from({ length: props.elevatorData.floors });
    setFloors(() => setupFloors);

    const setupElevators = props.elevatorData.elevators.map((e) => {
        let floors: number[] =  [];
        e.floors.forEach((r) => {
            for (let i = r.start; i <= r.end; i++) {
                floors.push(i);
            }
        });
        return { floors };
    });
    setElevators(() => setupElevators);
    }, []); 


  const getFloorPanelButtonConfiguration = ((floorNum:number): string [] => {
    if (floorNum === floors.length - 1){
        return ["", "down"];
    }
    if (floorNum === 0) {
        return ["up", ""];
    }
    return ["up", "down"];
  })

  function  getElevatorPanelButtonConfiguration() {
     return [...floors.keys()].map(f => `${f + 1}`);
  }

 
  function handleUp (data:number) {
    setFloorRequest({floorNumber: data, direction: 'up'});
  };

  
  function handleDown (data:number) {
    setFloorRequest({floorNumber: data, direction: 'down'});
  };

  return (
    <>
    <h1>Assignment Elevator Bank</h1>
    <div className="elevator-bank">
        <div className="floors">
            {floors.map ((floor, index ) => {  
                floorData.floorNumber = index+1;
                floorData.panelButtonConfiguration = getFloorPanelButtonConfiguration(index+1);
                return (
                    <>
                      <Floor floorNumber={index + 1}  panelType='default' floorPanelButtonConfiguration={getFloorPanelButtonConfiguration(index)} onUp={handleUp} onDown={handleDown}  />
                    </>
                )
            })
            }
        </div>
        <div className="elevators">
            {
                elevators.map((elevator, index) => {
                    return (
                        <div className='elevator'>
                        <Elevator  index={index}  floorRequest={floorRequest} elevatorPanelButtonConfiguration={getElevatorPanelButtonConfiguration()} />
                        </div>
                    )  
                })
            }
        </div>
    </div>
    </>
  )
}

//set default props, deprecated to be replaced
const floorData = {
    floorNumber: 0,
    panelButtonConfiguration: ["",""]
}

export default ElevatorBank
