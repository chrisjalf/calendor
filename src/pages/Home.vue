<script lang="ts">
import { defineComponent, Reactive, reactive, ref } from "vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions } from "@fullcalendar/core";

import TheCalendar from "../components/TheCalendar.vue";
import EventForm from "../components/EventForm.vue";
import EventModal from "../components/EventModal.vue";

export default defineComponent({
  components: { TheCalendar, EventForm, EventModal },
  setup() {
    const events = reactive([
      { title: "event 1", start: "2024-09-01" },
      { title: "event 2", start: "2024-09-02" },
    ]);
    const calendarOptions: Reactive<CalendarOptions> = reactive({
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
      events: events,
      dayMaxEvents: true,
      eventClick: handleEventClick,
    });
    let eventModal = ref(null);

    function todo() {
      events.push({
        title: "event 3",
        start: "2024-09-12",
      });
    }

    function handleEventClick() {
      console.log("Clicked");
      eventModal.value.showModal();
    }

    return { calendarOptions, todo, eventModal };
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
