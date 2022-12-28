import { describe, expect, test, vi, afterEach, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

import DeleteItemsDialog from "../src/ui-components/DeleteItemsDialog.vue";
import { useDialogsStore } from "../src/store/dialogs";

describe("DeleteItemsDialog.test", () => {
  let wrapper;

  beforeEach(() => {
    setActivePinia(createPinia());

    wrapper = shallowMount(DeleteItemsDialog, {
      global: {
        components: { Dialog, Button },
        plugins: [PrimeVue],
        mocks: {
          ["$primevue"]: {
            config: {
              ripple: true,
            },
          },
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("match the default snapshot", async () => {
    expect(DeleteItemsDialog).toBeTruthy();

    expect(wrapper.element).toMatchSnapshot();
  });

  test("show the dialog when DeleteItemsDialog is true", async () => {
    expect(DeleteItemsDialog).toBeTruthy();
    const store = useDialogsStore();

    store.setDeleteItemsDialog(true);

    await nextTick();

    expect(wrapper.element).toMatchSnapshot();
  });
});
