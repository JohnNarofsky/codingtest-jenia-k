//import React from 'react'
import '../../styles/Assignments.css';
import ElevatorButton from './ElevatorButton';

interface panelProps {
        panelType: string;      // "default"
        floorNumber:number;     // 0
        panelButtonConfiguration: string []; 
        destination?: (data:number) => void;  
        upClick?: (data:number) => void;  
        downClick?: (data:number) => void;  
}

const Panel = (props: panelProps) => {
  
  const buttonConfiguration = props.panelButtonConfiguration.map ((button) => {
        const label = (button === "down") ? "↓" : (button === "up") ? "↑" : (button === "") ? "" : button + "";
        const event = (button === "") ? "" : isNaN(parseInt(button)) ? button : "destination";
        const data = isNaN(parseInt(button)) ? props.floorNumber.toString() : button;
        return {
              buttonLabel: label,
              buttonEvent: event,
              buttonData: data
            } 
  });
  
  const handleClick = (btnLabel:string, btnEvent: string, btnData:string) =>  {
    if (btnLabel === "↑") {
      if (props.upClick) {
        props.upClick(parseInt(btnData));
      }
    } else if (btnLabel === "↓") {
        if (props.downClick) {
          props.downClick(parseInt(btnData));
        }
    }
  };
  
  const handleDestination /*eslint-disable-line @typescript-eslint/no-unused-vars*/ = (data:number) => {
     if (props.destination) {
       props.destination(data);
     }
  };

  return (
    <div>
       {
        buttonConfiguration.map((elevatorButton /*, index*/) => {
            return (
                <ElevatorButton buttonLabel={elevatorButton.buttonLabel} buttonEvent={elevatorButton.buttonEvent} buttonData={elevatorButton.buttonData} 
                 onButtonClick={handleClick} > 
                {elevatorButton.buttonLabel}
                </ElevatorButton>
            )
          })
        }
    </div>
  )
}

//set default props, deprecated to be replaced
Panel.defaultProps = {
    panelType: "default",
    floorNumber: 0,
    panelButtonConfiguration: []
};


export default Panel
