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
    addEvent(context, payload: Event) {
      const updatedEvents = [...context.state.events, payload];
      context.commit("setEvents", updatedEvents);
    },
    deleteEvent(context, payload: string) {
      const updatedEvents = context.state.events.filter(
        (event) => event.id !== payload
      );
      context.commit("setEvents", updatedEvents);
    },
  },
});

export default store;
