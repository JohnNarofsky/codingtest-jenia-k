<script>
import ContentItem from './ContentItem.vue'
import ElevatorBank from './assignment-components/elevator-bank.vue';

export default {
  components: {
    ContentItem,
    ElevatorBank,
  },
  data() {
    return {
      elevatorData: {
        floors: 6,
        elevators: [{floors: [{start: 1, end: 6}]}]
      }
    }
  }
}


</script>

<template>
  <ContentItem>
    <template #heading>Application</template>
    <ElevatorBank 
      :elevator-data="elevatorData"
    />
  </ContentItem>
</template>
