//import React from 'react'
import '../../styles/Assignments.css';
import Panel from './Panel';

interface FloorProps {
   floorNumber:number;
   panelType: string;
   floorPanelButtonConfiguration: string [];
   onUp?: (data: number) => void;
   onDown?: (data: number) => void;
}

const Floor = (props: FloorProps) => {

  const panelButtonConfiguration = props.floorPanelButtonConfiguration;

  const handleUp = ((data:number) => {
       if (props.onUp && data > 0) {props.onUp(data)}
  });

  const handleDown = ((data:number) => {
    if (props.onDown && data > 0) {props.onDown(data)}
  });
 

  return (
    <div className="floor">
      <div className="elevator-floor">
        Floor { props.floorNumber }
        <Panel panelType= {props.panelType} floorNumber={props.floorNumber} panelButtonConfiguration={panelButtonConfiguration} upClick={handleUp} downClick={handleDown}/>
      </div>
    </div>
  )
}

export default Floor
