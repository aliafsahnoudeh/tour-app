import { describe, expect, test, vi, afterEach, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { mount, shallowMount } from "@vue/test-utils";
import { useDialogsStore } from "../src/store/dialogs";
import { useTourStore } from "../src/store/tour";
import type TourModel from "../src/types/TourModel";

import PrimeVue from "primevue/config";
import Card from "primevue/card";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Toolbar from "primevue/toolbar";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Menubar from "primevue/menubar";

import TourDialog from "../src/ui-components/TourDialog.vue";
import { nextTick } from "vue";

describe("TourDialog", () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());

    wrapper = shallowMount(TourDialog, {
      propsData: {
        submitted: false,
      },
      global: {
        components: { Dialog, InputText, Calendar, Dropdown, Button },
        plugins: [PrimeVue],
        mocks: {
          ["$primevue"]: {
            config: {
              ripple: true,
            },
          },
        },
        provide: {
          services: vi.fn(),
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("match the default snapshot", async () => {
    expect(TourDialog).toBeTruthy();

    expect(wrapper.element).toMatchSnapshot();
  });

  test("should shows fileds correctly", async () => {
    expect(TourDialog).toBeTruthy();
    const store = useDialogsStore();
    const tourStore = useTourStore();

    tourStore.setTour({
      Id: "",
      CustomerName: "test",
      LocationFrom: "a",
      LocationTo: "b",
      Driver: undefined,
      DriverId: undefined,
      ShipmentDate: new Date(),
    } as TourModel);

    store.setDriverDialog(true);

    await nextTick();

    expect(wrapper.element).toMatchSnapshot();
  });
});
