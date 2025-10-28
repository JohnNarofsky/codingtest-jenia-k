import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ElevatorBank from "../../assignment-components/elevator-bank.vue";

describe("elevator-bank.vue", () => {

    test("accurate floor count", async() => {

        const wantedProps = {
            elevatorData: {
                floors: 3,
                elevators: [{floors: [{start: 1, end: 3}]}]
              }        
        };

        const wrapper = mount(ElevatorBank, {
            props: wantedProps,
        });

        const expectedFloors = [undefined, undefined, undefined];

        expect(wrapper.vm.$data.floors.length).toEqual(expectedFloors.length);

    });
});