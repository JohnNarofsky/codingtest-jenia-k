//import React from 'react'
import '../../styles/Assignments.css';

import { useEffect, useState } from 'react';

interface ButtonProps {
    buttonLabel: string;
    buttonData: string;
    buttonEvent: string;
    children?: string;
    onButtonClick: (label:string, event:string, data:string) => void;
    destination?: (data:number) => void;
}
const ElevatorButton = (props: ButtonProps) => { 

  const [label, setLabel] = useState("");
  const [emittedEvent, setEmittedEvent] = useState("");
  const [emittedData, setEmittedData] = useState("");

  useEffect(() => {
      setLabel(() => props.buttonLabel);
      setEmittedEvent(() => props.buttonEvent);
      setEmittedData(() => props.buttonData);

  }, [props.buttonLabel, props.buttonEvent, props.buttonData]);

  const handleClick = () => {
    if (label !== "" && emittedEvent !== "" && emittedData !== "") {
      if (props.onButtonClick) {
        props.onButtonClick(label, emittedEvent, emittedData);
      }
    }
  };

  const handleDestination /*eslint-disable-line @typescript-eslint/no-unused-vars*/ = () => {
    if (emittedData !== "") {
      if (props.destination) {
        props.destination(parseInt(emittedData));
      }
    }
  };

  
  return (
    <button className= { props.buttonLabel.length > 0 ? "orangeButton" : "clearButton"} onClick={handleClick} disabled={props.buttonLabel.length === 0} >{props.children}</button>
  )

}

//set default props, deprecated to be replaced
ElevatorButton.defaultProps = {
  buttonData: "",
  buttonLabel: "",
  buttonEventon: "",
  children: "",
 };

export default ElevatorButton;
