<script>
import ElevatorButton from './button.vue'

export default {
    name: "panel",
    components: {
        ElevatorButton,
    },
    props: {
        panelType: "default",
        floorNumber: 0,
        panelButtonConfiguration:Array
    },
    data() {
        return {
            buttonConfiguration: [],
            emitTarget: -1,
        }
    },
    created() {
        this.buttonConfiguration = this.panelButtonConfiguration.map((button) => {
            let label = button === "down" ? "&darr;" : button === "up" ? "&uarr;" : button === "" ? "&nbsp;" : button + "";
            let event = button === "" ? "" : isNaN(button) ? button : "destination"; 
            let data = isNaN(button) ? this.floorNumber : button;
            return {
                buttonLabel: label,
                buttonEvent: event,
                buttonData: data
            };
            ;
        });

        this.emitTarget = this.floorNumber;
    },
    emits: ['up', 'down', 'destination'],
    methods: {
        handleUp(data) {
            this.$emit('up', data);
        },
        handleDown(data) {
            this.$emit('down', data);
        },
        handleDestination(data) {
            this.$emit('destination', data);
        },
    },
}
</script>

<template>
    <ElevatorButton 
        v-for="(elevatorButton, index) in buttonConfiguration"
        :button-label="elevatorButton.buttonLabel"
        :button-event="elevatorButton.buttonEvent"
        :button-data="elevatorButton.buttonData"
        @destination="handleDestination"
        @down="handleDown"
        @up="handleUp"
    />
</template>

<style scoped>
</style>