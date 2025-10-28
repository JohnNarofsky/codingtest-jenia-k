//import React from 'react'
import ContentItem from "./ContentItem";
import ElevatorBank from "./assignment-components/ElevatorBank"; 

const Assignment = () => {

const elevatorData = {
  floors: 6,
  elevators:  [{floors: [{start: 1, end: 6}]}]
}

  return (
    <div>
     <ContentItem heading="Application" >
      <ElevatorBank  elevatorData={elevatorData}/>
     </ContentItem>
    </div>
  )
}

export default Assignment
