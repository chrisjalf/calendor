<script lang="ts">
import { defineComponent, ref } from "vue";

import { EventRequest } from "../store";
import { dateFormatter } from "../utils/index";

import TheDateRangePicker from "./TheDateRangePicker.vue";

export default defineComponent({
  components: { TheDateRangePicker },
  emits: { addEvent: (_: EventRequest) => true },
  setup(_, { emit }) {
    const eventName = ref("Interview");
    const eventDescription = ref("JS One Sdn Bhd");
    const eventDates = ref<string[]>([]);

    function changeEventDates(dates: Date[]) {
      const filteredDates = dates.filter((date) => date !== null);
      let processedDates: string[] = [];

      if (filteredDates.length !== 0) {
        processedDates.push(dateFormatter(filteredDates[0]));

        if (filteredDates.length > 1)
          processedDates.push(dateFormatter(filteredDates[1]));
      }

      eventDates.value = processedDates;
    }

    function handleAddEvent() {
      const dates = eventDates.value;

      if (dates.length === 0) return;

      let event: EventRequest = {
        title: eventName.value,
        description: eventDescription.value,
        start: dates[0],
        // start: eventDates.value[0],
      };

      if (dates.length > 1) {
        event.end = dates[1];
        // event.end = eventDates.value[1];
      }

      emit("addEvent", event);
    }

    return {
      eventName,
      eventDescription,
      eventDates,
      changeEventDates,
      handleAddEvent,
    };
  },
});
</script>

<template>
  <div class="mb-3">
    <label class="form-label">Name</label>
    <input type="email" class="form-control" v-model="eventName" />
  </div>
  <div class="mb-3">
    <label class="form-label">Description</label>
    <textarea class="form-control" v-model="eventDescription"></textarea>
  </div>
  <div class="mb-3">
    <label class="form-label">Date</label>
    <TheDateRangePicker @afterSelect="changeEventDates" />
  </div>
  <button type="submit" class="btn btn-primary" @click="handleAddEvent">
    Submit
  </button>
</template>
