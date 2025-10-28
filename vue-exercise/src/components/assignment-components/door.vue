<script>
export default {
    name: "door",
    components: {
    },
    props: {
        panelType: {
            type: String,
            default: ""
        },
        doorStatus: {
            type: String,
            default: "CLOSED"
        }
    },
    data() {
        return {
            isDoorOpen: false,
            isDoorClosing: false,
            isDoorOpening: false,
        }
    },
    created() {
      this.number = this.floorNumber;
    },
}
</script>

<template>
    <div class="elevator-door">
        <div>Door is {{ doorStatus }}.</div>
    </div>
</template>

<style scoped>
.elevator-door {
    display: flex;
    flex-direction: row;
    column-gap: 20px;
}
</style>