import { describe, expect, test, vi, afterEach, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";

import useTours from "../src/logical-components/useTours";
import services from "../src/services/index";
import TourModel from "../src/types/TourModel";

const TestComponent = {
  template: `<div><p v-for="tour in tours" :key="tour.Id" class="tour">tour</p>{{tour}}</div>`,
  data() {
    return {
      ...useTours(),
    };
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
});
