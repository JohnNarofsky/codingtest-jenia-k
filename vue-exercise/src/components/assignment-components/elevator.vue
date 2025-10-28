<script>
import Panel from './panel.vue'
import Door from './door.vue'

export default {
    name: "elevator",
    components: {
        Panel,
        Door,
    },
    props: {
        panelType: "default",
        elevatorPanelButtonConfiguration: Array,
        index: {
            type: Number,
            default: 0
        },
        floorRequest: {}, 
    },
    data() {
        return {
            isMoving: false,
            currentDirection: "",
            doorStatus: "CLOSED",
            destinationQueue: [],
            isAvailable: false,
            panelButtonConfiguration: [],
            elevatorID : "",
            currentFloor: 1,
            previousFloor: -1,
            targetFloor: -1,
            currentMoveTimeout: -1,
        }
    },
    created() {
        this.elevatorID = `Elevator # ${this.index +1 }`;
        this.panelButtonConfiguration = this.elevatorPanelButtonConfiguration;
        this.incomingRequest = this.floorRequest;
    },
    watch: {
        floorRequest: {
            immediate: true,
            deep: true,
            handler (newFloorRequest){
                //newFloorRequest comes in with two properties: the floorNumber, and a direction: "up" or "down"
                if (newFloorRequest?.floorNumber !== undefined){
                    this.destinationQueue.push(newFloorRequest.floorNumber);
                }
            }
        },
        destinationQueue: {
            immediate: true,
            handler (oldQueue, newQueue){
                if (!this.isMoving){
                    this.move();
                }
            },
            deep: true
        },
    },
    methods: {
        move(){
            if (this.currentFloor === this.destinationQueue[0]){
                this.destinationQueue.shift();
                this.handleArrival();
            } else {
                this.isMoving = true;
                this.currentDirection = this.currentFloor < this.destinationQueue[0] ? "up" : this.currentFloor > this.destinationQueue[0] ? "down" : "";
                this.targetFloor = this.destinationQueue[0];
                let target = this.currentFloor;
                this.previousFloor = this.currentFloor;
                if (this.currentDirection === "up"){
                    target++;
                }
                if (this.currentDirection == "down"){
                    target--;
                }
                this.currentFloor = target;
                this.currentMoveTimeout = setTimeout(() => {
                    this.move();
                }, 3000);
            }
        },
        handleArrival(){
            clearTimeout(this.currentMoveTimeout);
            setTimeout(() => {                
                setTimeout(() => {
                    this.doorStatus = "OPENING";
                    setTimeout(() => {
                        this.doorStatus = "OPEN";
                        setTimeout(() => {
                            this.doorStatus = "CLOSING";
                            setTimeout(()=> {
                                this.doorStatus = "CLOSED";
                                setTimeout(()=>{
                                    if (this.destinationQueue.length > 0){
                                        this.move();
                                    }
                                }, 3000);
                            }, 3000);
                        }, 3000);
                    }, 3000);
                }, 3000);
                this.isMoving = false;
            }, 3000);
        },
        handleDestination(data) {
            if (!(this.destinationQueue.find((i) => i === data))){
                this.destinationQueue.push(data);
            }
        },
    }
}
</script>

<template>
    <div class="elevator">
        <h1>{{ this.elevatorID }}</h1>
        <div class="elevator-panel">
            Panel: 
            <Panel 
                :floor-number="-1" 
                :panel-type="panelType" 
                :panel-button-configuration="this.panelButtonConfiguration"
                @destination="handleDestination"
            />
        </div>
        <Door :door-status="doorStatus" />
        <div class="status">
            <span v-if="isMoving">CURRENT FLOOR IS {{ previousFloor }}.</span>
            <span v-else>CURRENT FLOOR IS {{ currentFloor }}.</span> &nbsp;
            <span v-if="isMoving && currentDirection === 'up'">ASCENDING TO FLOOR {{ this.targetFloor }}.</span>
            <span v-if="isMoving && currentDirection === 'down'">DESCENDING TO FLOOR {{ this.targetFloor }}.</span>
        </div>
        <div>QUEUED FLOORS:</div>
        <div class="queue">
            <div v-for="destination in destinationQueue">{{ destination }}</div>
        </div>
    </div>
</template>

<style scoped>
.elevator {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}

.queue {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-x: auto;
}

.queue > * {
    margin-right: 10px;
    margin-bottom: 10px;
    width: 50px;
    background-color: #eee;
    text-align: center;
}

@media (prefers-color-scheme: dark) {
    .queue > * {
        background-color: #555;
    }
}

</style>