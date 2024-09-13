<script lang="ts">
import { defineComponent, ref } from "vue";

import { EventRequest } from "../store";
import { dateFormatter } from "../utils/index";

import TheDateRangePicker from "./TheDateRangePicker.vue";

interface EventFormError {
  name?: string;
  description?: string;
  startDate?: string;
}

export const initialEventFormError: EventFormError = {};

export default defineComponent({
  components: { TheDateRangePicker },
  emits: { addEvent: (_: EventRequest) => true },
  setup(_, { emit }) {
    const eventName = ref("");
    const eventDescription = ref("JS One Sdn Bhd");
    const eventDates = ref<string[]>([]);
    const eventFormError = ref<EventFormError>(initialEventFormError);

    function validateInput(fieldName: string) {
      let errorMessage: string | undefined;

      switch (fieldName) {
        case "name":
          if (eventName.value.trim() === "") errorMessage = "Name is required";
          else errorMessage = undefined;

          break;
        case "description":
          if (eventDescription.value.trim() === "")
            errorMessage = "Description is required";
          else errorMessage = undefined;

          break;
        default:
          break;
      }

      eventFormError.value[fieldName] = errorMessage;
    }

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
      };

      if (dates.length > 1) {
        event.end = dates[1];
      }

      emit("addEvent", event);
    }

    return {
      eventName,
      eventDescription,
      eventDates,
      eventFormError,
      validateInput,
      changeEventDates,
      handleAddEvent,
    };
  },
});
</script>

<template>
  <div class="mb-3">
    <label class="form-label">Name</label>
    <input
      type="email"
      class="form-control"
      :class="{ 'is-invalid': eventFormError.name }"
      @focus="validateInput('name')"
      @input="validateInput('name')"
      v-model="eventName"
    />
    <div className="invalid-feedback" v-if="eventFormError.name">
      {{ eventFormError.name }}
    </div>
  </div>
  <div class="mb-3">
    <label class="form-label">Description</label>
    <textarea
      class="form-control"
      :class="{ 'is-invalid': eventFormError.description }"
      @focus="validateInput('description')"
      @input="validateInput('description')"
      v-model="eventDescription"
    ></textarea>
    <div className="invalid-feedback" v-if="eventFormError.description">
      {{ eventFormError.description }}
    </div>
  </div>
  <div class="mb-3">
    <label class="form-label">Date</label>
    <TheDateRangePicker @afterSelect="changeEventDates" />
  </div>
  <button type="submit" class="btn btn-primary" @click="handleAddEvent">
    Submit
  </button>
</template>
