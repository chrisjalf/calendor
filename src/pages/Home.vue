<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions } from "@fullcalendar/core";

export default defineComponent({
  components: { FullCalendar },
  setup() {
    const calendarOptions: Ref<CalendarOptions> = ref({
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      headerToolbar: {
        left: "prev,next",
        center: "title",
        right: "today dayGridMonth,timeGridWeek,timeGridDay",
      },
      buttonText: {
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
      },
      initialView: "dayGridMonth",
      events: [
        { title: "event 1", start: "2024-09-01" },
        { title: "event 2", start: "2024-09-02" },
      ],
      dayMaxEvents: true,
    });

    return { calendarOptions };
  },
});
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>

<style scoped>
.fc {
  /* the calendar root */
  padding: 3rem;
  max-width: 1100px;
  margin: 0 auto;
}

:deep(a) {
  color: unset;
  text-decoration: unset;
}
</style>
