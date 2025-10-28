<script>
import Elevator from './elevator.vue'
import Floor from './floor.vue'


export default {
    name: "ElevatorBank",
    components: {
        Elevator,
        Floor,
    },
    props: {
        elevatorData: {}
    },
    data() {
        return {
            setupElevatorData: this.elevatorData,
            floors: [],
            elevators: [],
            floorRequest: {},
        }
    },
    created() {
        this.floors = Array(this.setupElevatorData.floors);
        this.elevators = this.setupElevatorData.elevators.map((e) => {
            // what comes in: {floors: [{start: 1, end: 6}]}
            let floors = [];
            e.floors.forEach((r) => {
                for (let i = r.start; i <= r.end; i++){
                    floors.push(i);
                }
            });
            return {
                floors: floors,
            };
        });
    },
    computed: {
        
    },
    methods: {
        getFloorPanelButtonConfiguration(floorNumber){
            if (floorNumber === this.floors.length - 1){
                return ["", "down"];
            }
            if (floorNumber === 0) {
                return ["up", ""];
            }
            return ["up", "down"];
        },
        getElevatorPanelButtonConfiguration() {
            return [...this.floors.keys()].map(f => f + 1);
        },
        handleUp(data) {
            this.floorRequest = {floorNumber: data, direction: 'up'};
        },
        handleDown(data) {
            this.floorRequest = {floorNumber: data, direction: 'down'};
        },
    },
}


</script>

<template>
    <h1>Assignment Elevator Bank</h1>
    <div class="elevator-bank">
        <div class="floors">
            <Floor v-for="(floor, index) in floors"
                :floor-number="index + 1"
                :floor-panel-button-configuration="getFloorPanelButtonConfiguration(index)"
                @down="handleDown"
                @up="handleUp"

            />
        </div>
        <div class="elevators">
            <Elevator v-for="(elevator, index) in elevators"
                :index="elevator.index"
                :floors="elevator.floors"
                :floor-request="this.floorRequest"
                :elevator-panel-button-configuration="getElevatorPanelButtonConfiguration()"
            />
        </div>
    </div>
</template>

<style scoped>
.floors {
    display: flex;
    flex-direction: column-reverse;
    background-color: #5588ff;
    padding: 3px;
}

.elevator-bank {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.elevator-bank > * {
    background-color: #fff;
}

@media (prefers-color-scheme: dark) {
    .elevator-bank > * {
        background-color: #333;
    }
}
</style>
