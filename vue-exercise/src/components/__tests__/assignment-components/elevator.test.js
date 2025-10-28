import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Elevator from "../../assignment-components/elevator.vue";

describe("elevator.vue", () => {

    test("displays Elevator Number", async() => {

        const wantedProps = {
            index: 33,
            elevatorPanelButtonConfiguration: [],
        };

        const wrapper = mount(Elevator, {
            props: wantedProps,
        });

        expect(wrapper.find(`Elevator # ${wantedProps.index +1 }`));
    });

    //TODO: ADD TESTS FOR EVENTS RELATED TO CLOSING AND OPENING OF THE DOOR
});