//import React from 'react'
import '../../styles/Assignments.css';

interface DoorProps {
    panelType?: string;  
    doorStatus: string;   
}

const Door = ({ doorStatus="CLOSED"}: DoorProps) => {
  
  return (

    <div className="elevator-door">
      <div>Door is {doorStatus}</div>
    </div>
  )
}

export default Door
