import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Door from "../../assignment-components/door.vue";

describe("door.vue", () => {

    test("displays status", async() => {

        const wantedProps = {
            panelType: "testPanelType",
            doorStatus: "testDoorStatus",
        };

        const wrapper = mount(Door, {
            props: wantedProps,
        });

        expect(wrapper.find(wantedProps.doorStatus));
    });
});