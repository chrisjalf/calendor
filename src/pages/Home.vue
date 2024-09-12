<script lang="ts">
import { defineComponent, Reactive, reactive } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarOptions } from "@fullcalendar/core";

export default defineComponent({
  components: { FullCalendar },
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
    });

    function todo() {
      events.push({
        title: "event 3",
        start: "2024-09-12",
      });
    }

    return { calendarOptions, todo };
  },
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <FullCalendar :options="calendarOptions" />
      </div>
      <!-- Placeholder -->
      <div class="col-lg-4">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input type="email" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea class="form-control"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" @click="todo">
          Submit
        </button>
      </div>
    </div>
  </div>
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
</style>
