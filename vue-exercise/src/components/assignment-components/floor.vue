<script>
import Panel from './panel.vue'

export default {
    name: "Floor",
    components: {
        Panel,
    },
    props: {
        floorNumber: 0,
        panelType: "default",
        floorPanelButtonConfiguration: Array
    },
    data() {
        return {
            number: 0,
            panelButtonConfiguration: []
        }
    },
    created() {
      this.number = this.floorNumber;
      this.panelButtonConfiguration = this.floorPanelButtonConfiguration;
    },
    methods: {
        handleUp(data) {
            this.$emit('up', data);
        },
        handleDown(data) {
            this.$emit('down', data);
        },
    },
}
</script>

<template>
  <div class="elevator-floor">
    <h3>Floor {{ number }}</h3>
    <Panel 
      :panel-type="panelType" 
      :floor-number="number" 
      :panel-button-configuration="panelButtonConfiguration"
      @down="handleDown"
      @up="handleUp"
    />
  </div>
</template>

<style scoped>
.elevator-floor {
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  margin-bottom: 20px;
  background-color: #eee;
}


@media (prefers-color-scheme: dark) {
    .elevator-floor {
        background-color: #333;
    }
}
</style>
