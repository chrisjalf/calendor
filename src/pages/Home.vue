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
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        meridiem: false,
      },
      slotLabelFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
      slotMaxTime: "23:59:59",
      dayMaxEvents: true,
      eventClick: handleEventClick,
    });
    const eventModal = ref<InstanceType<typeof EventModal>>();

    function addEvent(event: EventRequest) {
      store.dispatch("addEvent", event);
    }

    function deleteEvent(id: string) {
      store.dispatch("deleteEvent", id);
    }

    function handleEventClick(clickInfo: EventClickArg) {
      eventModal.value?.showModal(clickInfo.event);
    }

    watch(
      () => store.state.events,
      (newVal) => {
        calendarOptions.events = newVal.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          extendedProps: {
            description: event.description,
          },
          end: event.end,
        }));
      }
    );

    onMounted(() => {
      calendarOptions.events = store.state.events.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        extendedProps: {
          description: event.description,
        },
        end: event.end,
      }));
    });

    return {
      calendarOptions,
      eventModal,
      addEvent,
      deleteEvent,
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
      <div class="col-lg-4 event-form">
        <EventForm @addEvent="addEvent" />
      </div>
    </div>
    <EventModal ref="eventModal" @deleteEvent="deleteEvent" />
  </div>
</template>

<style scoped>
.event-form {
  padding: 3rem 0.5rem;
}
</style>
