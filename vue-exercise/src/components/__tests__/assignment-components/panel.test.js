import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Panel from "../../assignment-components/panel.vue";

describe("panel.vue", () => {

    test("has buttons", async() => {

        const wantedProps = {
            panelType: "testPanelType",
            floorNumber: "20",
            panelButtonConfiguration: ["up", "down", "", "1", "3"],
        };

        const expectedPanelConfiguration = [
            {
                buttonLabel: "&uarr;",
                buttonEvent: "up",
                buttonData: "20"
            }, 
            {
                buttonLabel: "&darr;",
                buttonEvent: "down",
                buttonData: "20"
            }, 
            {
                buttonLabel: "&nbsp;",
                buttonEvent: "",
                buttonData: ""
            }, 
            {
                buttonLabel: "1",
                buttonEvent: "destination",
                buttonData: "1"
            }, 
            {
                buttonLabel: "3",
                buttonEvent: "destination",
                buttonData: "3"
            },
        ];

        const wrapper = mount(Panel, {
            props: wantedProps,
        });

        expect(wrapper.vm.$data.buttonConfiguration).toEqual(expectedPanelConfiguration);
    });
});