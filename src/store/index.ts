import { createStore } from "vuex/types/index.d.ts";

interface Event {
  id: string;
  name: string;
  description: string;
}

interface State {
  events: Event[];
}

const store = createStore<State>({
  state: {
    events: [],
  },
  getters: {},
  mutations: {},
  actions: {},
});

export default store;
