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
        isFire: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isMoving: false,
            isArriving: false,
            isEmergency: false,
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
                if (newFloorRequest?.floorNumber !== undefined && !this.isFire){
                    this.destinationQueue.push(newFloorRequest.floorNumber);
                } else if (this.isFire) {
                    this.destinationQueue.length = 0;
                    this.destinationQueue.push(1);
                    this.move();
                }
                
            }
        },
        destinationQueue: {
            immediate: true,
            handler (oldQueue, newQueue){
                if (!this.isMoving && !this.isFire){
                    this.move();
                }
            },
            deep: true
        },
    },
    methods: {
        move(){
            // Stop elevator if emergency button was pressed
            if (this.isEmergency) return;
            
            if (this.currentFloor === this.destinationQueue[0]){
                this.destinationQueue.shift();
                this.isArriving = true;
                this.handleArrival();
            } else {

                // Waits before doors close to move
                if (this.isArriving) return;
                this.isMoving = true;
                this.currentDirection = this.currentFloor < this.destinationQueue[0] ? "up" : this.currentFloor > this.destinationQueue[0] ? "down" : "";
                this.targetFloor = this.destinationQueue[0];
                let target = this.currentFloor;
                this.previousFloor = this.currentFloor;
                
                if (this.currentDirection === "up"){
                    target++;
                    // Completing all requests going up
                    this.targetFloor = Math.max(...this.destinationQueue);
                    this.destinationQueue = this.destinationQueue.filter(floor => floor !== this.targetFloor);
                    this.destinationQueue.unshift(this.targetFloor)
                }
                if (this.currentDirection == "down"){
                    target--;
                    // Completing all requests going down 
                    this.targetFloor = Math.min(...this.destinationQueue);
                    this.destinationQueue = this.destinationQueue.filter(floor => floor !== this.targetFloor);
                    this.destinationQueue.unshift(this.targetFloor)
                }
                this.currentFloor = target;

                // Elevator stops along the way
                if (this.destinationQueue.includes(this.currentFloor)) {
                    this.destinationQueue = this.destinationQueue.filter(floor => floor !== this.currentFloor);
                    this.isArriving = true;
                    this.handleArrival();
                }
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
                                    this.isArriving = false;
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
        handleEmergency(data) {
            if (this.isEmergency){
                this.isEmergency = false;
                if (this.destinationQueue.length > 0){
                    this.isArriving = false;
                    this.move();
                }
                console.log("Emergency button released");
            } else {
                this.isEmergency = true;
                this.isMoving = false;
                console.log("Emergency button pressed");
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
                :isFire="isFire"
                @destination="handleDestination"
                @emergency="handleEmergency"
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
        <div class="floor-doors">
            <div v-for="floor in 6">
                Floor {{ floor }}: {{ floor===currentFloor ? doorStatus : "CLOSED" }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.elevator {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
}
.floor-doors{
    position: absolute;
    top: 95px;
    right: 110px;
    background-color: #eee;
    display: flex;
    flex-direction: column-reverse;
    row-gap: 25px;
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