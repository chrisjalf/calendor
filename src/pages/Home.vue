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
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <FullCalendar :options="calendarOptions" />
      </div>
      <!-- Placeholder -->
      <div class="col-lg-4">
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Email address</label
            >
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label"
              >Password</label
            >
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1"
              >Check me out</label
            >
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
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
