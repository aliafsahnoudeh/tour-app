import { describe, expect, test, vi, afterEach, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";
import flushPromises from "flush-promises";

import useTours from "../src/logical-components/useTours";
import services from "../src/services/index";
import { mockedTours } from "./mockedTours";

let useToursInstance;

const TestComponent = {
  template: `<div>{{tours}}<p v-for="tour in tours" :key="tour.Id" class="tour">{{tour}}</p></div>`,
  created: () => {
    useToursInstance = useTours();
  },
};

describe("useTours", () => {
  let wrapper;
  const tourServiceSpy = vi.spyOn(services.tourService, "fetch");

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("calls tourService fetch function onece", async () => {
    vi.mocked(services.tourService.fetch).mockReturnValueOnce(
      Promise.resolve([])
    );

    await nextTick();

    wrapper = shallowMount(TestComponent, {
      global: {
        provide: {
          services: {
            tourService: services.tourService,
          },
        },
      },
    });

    expect(tourServiceSpy).toBeCalledTimes(1);
  });

  test("sets the correct number of tours", async () => {
    vi.mocked(services.tourService.fetch).mockReturnValueOnce(
      Promise.resolve(mockedTours)
    );

    wrapper = shallowMount(TestComponent, {
      global: {
        provide: {
          services: {
            tourService: services.tourService,
          },
        },
      },
    });

    await nextTick();

    await flushPromises();

    expect(useToursInstance.tours.length).toBe(mockedTours.length);
  });
});
