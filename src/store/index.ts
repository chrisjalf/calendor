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
  getters: {
    events(state) {
      return state.events;
    },
  },
  mutations: {
    setEvents(state, payload) {
      state.events = [...payload];
    },
  },
  actions: {
    getEvents(context) {
      context.commit("setEvents", []);
    },
  },
});

export default store;
