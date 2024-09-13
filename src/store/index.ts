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

const eventsInStorage: string | null = localStorage.getItem("events") ?? null;
const parsedEvents: Event[] = eventsInStorage
  ? JSON.parse(eventsInStorage)
  : [];
const store = createStore<State>({
  state: {
    events: parsedEvents,
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

      localStorage.setItem("events", JSON.stringify(updatedEvents));
      context.commit("setEvents", updatedEvents);
    },
    deleteEvent(context, id: string) {
      const updatedEvents = context.state.events.filter(
        (event: Event) => event.id !== id
      );

      localStorage.setItem("events", JSON.stringify(updatedEvents));
      context.commit("setEvents", updatedEvents);
    },
  },
});

export default store;
