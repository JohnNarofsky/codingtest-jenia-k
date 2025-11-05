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
            isFire: false,
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
            // if (this.isFire) return;
            if (floorNumber === this.floors.length - 1){
                return ["", "down"];
            }
            if (floorNumber === 0) {
                return ["up", "fire"];
            }
            return ["up", "down"];
        },
        getElevatorPanelButtonConfiguration() {
            return [...Array.from(this.floors.keys()).map(f => f + 1), "emergency"];
        },
        handleUp(data) {
            this.floorRequest = {floorNumber: data, direction: 'up'};
        },
        handleDown(data) {
            this.floorRequest = {floorNumber: data, direction: 'down'};
        },
        handleFire(data) {
            if (this.isFire) {
                this.isFire = false;
                console.log("In case of fire button released");
            } else {
                this.isFire = true;
                this.floorRequest = {floorNumber: data, direction: 'down'};
                console.log("In case of fire button pressed");
            }
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
                :isFire="isFire"
                @down="handleDown"
                @up="handleUp"
                @fire="handleFire"

            />
        </div>
        <div class="elevators">
            <Elevator v-for="(elevator, index) in elevators"
                :index="elevator.index"
                :floors="elevator.floors"
                :floor-request="this.floorRequest"
                :elevator-panel-button-configuration="getElevatorPanelButtonConfiguration()"
                :isFire="isFire"
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
