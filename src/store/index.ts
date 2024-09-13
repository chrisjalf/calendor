import { createStore } from "vuex";
import { v4 as uuid } from "uuid";

export interface EventRequest {
  title: string;
  description: string;
  start: string;
  end?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  start: string;
  end?: string;
}

export interface State {
  events: Event[];
}

const store = createStore<State>({
  state: {
    events: [
      {
        id: "1",
        title: "event 1",
        description: "It's an event",
        start: "2024-09-01",
      },
      {
        id: "2",
        title: "event 2",
        description: "It's an event",
        start: "2024-09-02",
      },
    ],
  },
  getters: {
    events(state: State) {
      return state.events;
    },
  },
  mutations: {
    setEvents(state, payload: Event[]) {
      state.events = [...payload];
    },
  },
  actions: {
    addEvent(context, payload: EventRequest) {
      const newEvent: Event = {
        id: uuid(),
        ...payload,
      };
      const updatedEvents = [...context.state.events, newEvent];
      context.commit("setEvents", updatedEvents);
    },
    deleteEvent(context, id: string) {
      const updatedEvents = context.state.events.filter(
        (event: Event) => event.id !== id
      );
      context.commit("setEvents", updatedEvents);
    },
  },
});

export default store;
