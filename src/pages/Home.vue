<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions, EventClickArg } from "@fullcalendar/core";

import { State, EventRequest } from "../store/index";

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
      eventTimeFormat: {
        hour12: false,
        meridiem: false,
      },
      dayMaxEvents: true,
      eventClick: handleEventClick,
    });
    const eventModal = ref<InstanceType<typeof EventModal>>();

    function addEvent(event: EventRequest) {
      store.dispatch("addEvent", event);
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
          extendedProps: {
            id: event.id,
            description: event.description,
          },
          end: event.end,
        }));
      }
    );

    onMounted(() => {
      calendarOptions.events = store.state.events.map((event) => ({
        title: event.title,
        start: event.start,
        extendedProps: {
          id: event.id,
          description: event.description,
        },
        end: event.end,
      }));
    });

    return {
      calendarOptions,
      eventModal,
      addEvent,
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
        <EventForm @addEvent="addEvent" />
      </div>
    </div>
    <EventModal ref="eventModal" />
  </div>
</template>
