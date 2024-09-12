<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: { todo: () => true },
  setup(_, { emit }) {
    function handleTodo() {
      emit("todo");
    }

    return { handleTodo };
  },
});
</script>

<template>
  <div class="mb-3">
    <label class="form-label">Name</label>
    <input type="email" class="form-control" />
  </div>
  <div class="mb-3">
    <label class="form-label">Description</label>
    <textarea class="form-control"></textarea>
  </div>
  <button type="submit" class="btn btn-primary" @click="handleTodo">
    Submit
  </button>
</template>
