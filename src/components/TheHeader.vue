<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>

<template>
  <div class="container">
    <header
      class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"
    >
      <router-link
        to="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <span class="fs-4">Calendor</span>
      </router-link>

      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link active" aria-current="page">
            Home
          </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>
