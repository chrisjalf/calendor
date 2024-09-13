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
  padding: 3rem 1rem 3rem 1rem;
  margin: 0 auto;
}

:deep(a) {
  color: unset;
  text-decoration: unset;
}

:deep(.fc-event) {
  cursor: pointer;
}

@media (max-width: 770px) {
  .fc :deep(.fc-toolbar.fc-header-toolbar) {
    flex-direction: column;
    gap: 30px;
  }
}
</style>
