<script setup>
import ContentItem from './ContentItem.vue'
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="red">{{ msg }}</h1>

    <ContentItem>
      <template #heading>Overview</template>
      For this test, you'll be making improvements to the elevator application as shown. These improvements are to be made to
      the file located at <a>/mstar-assignment/src/components/Assignment.vue</a> in the test sent to you.
    </ContentItem>

    <ContentItem>
      <template #heading>Current Functionality</template>
      The elevator responds to a floor panel button push. It closes its doors and moves at 3 seconds per floor 
      from its current location in the direction of the floor where the event took place. It opens its doors upon arrival.
      The elevator doors take 3 seconds to close. When a button is pushed on the internal elevator panel, 
      the elevator moves at 3 seconds per floor to the destination.
      
    </ContentItem>
    <ContentItem>
      <template #heading>Task Set - Basic Functionality</template>
      <ul>
        <li>If a floor panel button or an elevator panel button is pushed while the elevator doors are open, the elevator doesn't close its doors before it moves. 
          Make the elevator wait until the doors are closed before it moves.
        </li>
        <li>The elevator accepts multiple button pushes inside the elevator but goes to each in order. Have the elevator stop along the way.</li>
        <li>
          If someone pushes a button inside the elevator that is not on the way, handle such requests after completing all requests going 
          in the elevator's current direction.
        </li>
      </ul>
    </ContentItem>

    <ContentItem>
      <template #heading>Task Set - Basic Improvements</template>
      <ul>
        <li>Add an emergency button to the elevator button panel. Have it stop the elevator immediately. Once the elevator is stopped, a second push
          on the emergency button should start the elevator again.
        </li>
        <li>
          Add a "in case of fire" button on the first floor. This should result in the elevator going directly to floor one and it should not respond to any
          button pushes until the "in case of fire button" is pushed again.
        </li>
      </ul>
    </ContentItem>

    <ContentItem>
      <template #heading>Task Set - UX/UI Redesign</template>
      <ul>
        <li>
          Change the very basic UI to something more representative of an elevator at work.
          <p>Add a representation of the door state on each floor to the right of the buttons for each floor with either a text or graphic representation.
            CSS-driven graphical representations are welcome!
            <ul>
              <li>When the elevator is not on a particular floor, have the door closed.</li>
              <li>When the elevator is on a particular floor, have the door respond to opening, being open, and closing.</li>
            </ul>
          </p>
          <p>When a floor is in queue, change the button pushed until it is no longer in queue.
            <ul>
              <li>When the floor is waiting, have the pushed button be brighter in color.</li>
              <li>When the floor is not waiting, have the pushed button return to its base color.</li>
              <li>Disable the pushed floor button until the request has been handled by the elevator.</li>
            </ul>
          </p>
        </li>
      </ul>
    </ContentItem>

    <ContentItem>
      <template #heading>Bonus Task Set - Second Elevator</template>
      <ul>
        <li>
          Add a second elevator. Send all floor button push requests to the closest elevator going in that direction. If no elevators are going in that direction
          then have the elevator that will stop soonest handle the floor button push request.
        </li>
        <li>
          Make one of the elevators an express elevator - it only handles button pushes coming from the top two floors and the bottom floor.
        </li>
      </ul>
    </ContentItem>
  </div>

</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

</style>
