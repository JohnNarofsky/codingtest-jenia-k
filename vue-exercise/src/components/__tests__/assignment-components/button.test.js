import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ElevatorButton from "../../assignment-components/button.vue";

describe("button.vue", () => {

    test("returns wanted event", async() => {

        const wantedProps = {
            buttonLabel: "testLabel",
            buttonEvent: "testEvent",
            buttonData: "emittedData",
        };

        const wrapper = mount(ElevatorButton, {
            props: wantedProps,
        });
        const thisButton = wrapper.find("button");
        await thisButton.trigger("click");
        expect(wrapper.emitted()).toHaveProperty(wantedProps.buttonEvent);

    });


    //TODO: ADD TEST FOR WANTED DATA COMING BACK

});
