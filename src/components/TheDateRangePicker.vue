<script lang="ts">
import { defineComponent, ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { dateFormatter } from "../utils/index";

export default defineComponent({
  components: { VueDatePicker },
  emits: {
    validateDates: () => true,
    afterSelect: (_: Date[]) => true,
  },
  setup(_, { emit, expose }) {
    const selectedDates = ref<Date[]>([]);

    function handleValidateDates() {
      emit("validateDates");
    }

    function handleAfterSelect() {
      emit("afterSelect", selectedDates.value ?? []);
    }

    function formatDate(dates: Date[]) {
      const filteredDates = dates.filter((date) => date !== null);

      if (filteredDates.length === 0) return "";

      const formattedStart = dateFormatter(filteredDates[0]);
      let displayDate = "";

      if (filteredDates.length > 1) {
        const formattedEnd = dateFormatter(filteredDates[1]);
        displayDate = `${formattedStart} - ${formattedEnd}`;
      } else displayDate = formattedStart;

      return displayDate;
    }

    function resetDates() {
      selectedDates.value = [];
    }

    expose({ resetDates });

    return {
      selectedDates,
      formatDate,
      handleValidateDates,
      handleAfterSelect,
      resetDates,
    };
  },
});
</script>

<template>
  <VueDatePicker
    range
    v-model="selectedDates"
    :format="formatDate"
    @open="handleValidateDates"
    @update:model-value="handleAfterSelect"
  />
</template>
