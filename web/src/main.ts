/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import { createPinia } from "pinia";

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

import router from "./router";

import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);

app.component("Card", Card);
app.component("Button", Button);
app.component("Avatar", Avatar);
app.component("DataTable", DataTable);
app.component("InputText", InputText);
app.component("Toolbar", Toolbar);
app.component("Column", Column);
app.component("Dialog", Dialog);
app.component("Dropdown", Dropdown);
app.component("Calendar", Calendar);

app.mount("#app");
