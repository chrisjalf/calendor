<script lang="ts">
import { defineComponent, PropType } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import { CalendarOptions } from "@fullcalendar/core";

export default defineComponent({
  components: { FullCalendar },
  props: {
    calendarOptions: {
      type: Object as PropType<CalendarOptions>,
      required: true,
    },
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
  margin: 0 auto;
}

:deep(a) {
  color: unset;
  text-decoration: unset;
}

:deep(.fc-event) {
  cursor: pointer;
}
</style>
