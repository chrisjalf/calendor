<script lang="ts">
import { defineComponent, ref } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default defineComponent({
  components: { FullCalendar },
  setup() {
    const calendarOptions = ref({
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridMonth",
      events: [
        { title: "event 1", date: "2024-09-01" },
        { title: "event 2", date: "2024-09-02" },
      ],
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
