import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Floor from "../../assignment-components/floor.vue";

describe("floor.vue", () => {

    test("displays FloorNumber", async() => {

        const wantedProps = {
            floorNumber: "33",
            floorPanelButtonConfiguration: [],
        };

        const wrapper = mount(Floor, {
            props: wantedProps,
        });

        expect(wrapper.find("Floor " + wantedProps.floorNumber));
    });
});