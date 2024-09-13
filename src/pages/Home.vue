<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  shallowRef,
  watch,
} from "vue";
import { useStore } from "vuex";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions, EventClickArg, EventInput } from "@fullcalendar/core";

import { State } from "../store/index";

import TheCalendar from "../components/TheCalendar.vue";
import EventForm from "../components/EventForm.vue";
import EventModal from "../components/EventModal.vue";

export default defineComponent({
  components: { TheCalendar, EventForm, EventModal },
  setup() {
    const store = useStore<State>();
    const calendarOptions = reactive<CalendarOptions>({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: "prev today next",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      buttonText: {
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
      },
      initialView: "dayGridMonth",
      events: [],
      dayMaxEvents: true,
      eventClick: handleEventClick,
    });
    const eventModal = ref<InstanceType<typeof EventModal>>();

    function todo() {
      store.dispatch("addEvent", {
        id: "69",
        title: "event 3",
        start: "2024-09-12",
        description: "Test",
      });
    }

    function handleEventClick(clickInfo: EventClickArg) {
      eventModal.value?.showModal(clickInfo.event);
    }

    watch(
      () => store.state.events,
      (newVal) => {
        calendarOptions.events = newVal.map((event) => ({
          title: event.title,
          start: event.start,
          extendedProps: { id: event.id },
        }));
      }
    );

    onMounted(() => {
      calendarOptions.events = store.state.events.map((event) => ({
        title: event.title,
        start: event.start,
        extendedProps: { id: event.id },
      }));
    });

    return {
      calendarOptions,
      eventModal,
      todo,
    };
  },
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <TheCalendar :calendarOptions="calendarOptions" />
      </div>
      <!-- Placeholder -->
      <div class="col-lg-4">
        <EventForm @todo="todo" />
      </div>
    </div>
    <EventModal ref="eventModal" />
  </div>
</template>
