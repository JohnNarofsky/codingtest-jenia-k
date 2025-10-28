<script>
export default {
    name: "ElevatorButton",
    components: {
    },
    props: {
        buttonLabel: "",
        buttonEvent: "",
        buttonData: null,
    },
    data() {
        return {
            label: "",
            emittedEvent: "",
            emittedData: "",
        }
    },
    created() {
        this.label = this.buttonLabel;
        this.emittedEvent = this.buttonEvent;
        this.emittedData = this.buttonData;
    },
    methods: {
        handleClick() {
            this.$emit(this.emittedEvent, this.emittedData);
        },
    },
}
</script>

<template>
    <span v-if="emittedEvent === ''" class="placeholder">&nbsp;</span>
    <button v-else @click="handleClick" v-html="this.buttonLabel" />
</template>

<style scoped>
.placeholder {
    width: 60px;
    height: 25px;
    background-color: #eee;
}


@media (prefers-color-scheme: dark) {
    .placeholder {
        background-color: #333;
    }
}

button {
    width: 60px;
    height: 25px;
    background-color: #ffbb00;
}

</style>