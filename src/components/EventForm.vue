<script lang="ts">
import { defineComponent, ref } from "vue";

import { EventRequest } from "../store";
import { dateFormatter } from "../utils/index";

import TheDateRangePicker from "./TheDateRangePicker.vue";

interface EventFormError {
  name?: string;
  description?: string;
  dates?: string;
}

const initialEventFormError: EventFormError = {
  name: undefined,
  description: undefined,
  dates: undefined,
};

export default defineComponent({
  components: { TheDateRangePicker },
  emits: { addEvent: (_: EventRequest) => true },
  setup(_, { emit }) {
    const eventName = ref("");
    const eventDescription = ref("");
    const eventDates = ref<string[]>([]);
    const eventFormError = ref<EventFormError>(initialEventFormError);
    const theDateRangePicker = ref<InstanceType<typeof TheDateRangePicker>>();

    function resetForm() {
      theDateRangePicker.value?.resetDates();
      eventName.value = "";
      eventDescription.value = "";
      eventDates.value = [];
    }

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
        case "dates":
          if (eventDates.value.length === 0)
            errorMessage = "Starting date is required";
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

      validateInput("dates");
    }

    function checkEventForm() {
      if (eventName.value.trim() === "")
        eventFormError.value["name"] = "Name is required";
      else eventFormError.value["name"] = undefined;

      if (eventDescription.value.trim() === "")
        eventFormError.value["description"] = "Description is required";
      else eventFormError.value["description"] = undefined;

      if (eventDates.value.length === 0)
        eventFormError.value["dates"] = "Starting date is required";
      else eventFormError.value["dates"] = undefined;
    }

    function handleAddEvent() {
      checkEventForm();

      if (
        Object.values(eventFormError.value).every((val) => val === undefined)
      ) {
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

        resetForm();
      }
    }

    return {
      eventName,
      eventDescription,
      eventDates,
      eventFormError,
      theDateRangePicker,
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
    <TheDateRangePicker
      ref="theDateRangePicker"
      :class="{ 'is-invalid': eventFormError.dates }"
      @validateDates="() => validateInput('dates')"
      @afterSelect="changeEventDates"
    />
    <div className="invalid-feedback" v-if="eventFormError.dates">
      {{ eventFormError.dates }}
    </div>
  </div>
  <button type="submit" class="btn btn-primary" @click="handleAddEvent">
    Submit
  </button>
</template>
