import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App.vue";
import router from "./router.ts";

const app = createApp(App);

app.use(router);

app.mount("#app");
