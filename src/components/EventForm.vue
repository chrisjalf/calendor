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
    const eventDates = ref<Date[]>([]);

    function changeEventDates(dates: Date[]) {
      eventDates.value = dates;
    }

    function handleAddEvent() {
      const filteredDates = eventDates.value.filter((date) => date !== null);

      if (filteredDates.length === 0) return;

      let event: EventRequest = {
        title: eventName.value,
        description: eventDescription.value,
        start: dateFormatter(filteredDates[0]),
        // start: eventDates.value[0],
      };

      if (filteredDates.length > 1) {
        event.end = dateFormatter(filteredDates[1]);
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
