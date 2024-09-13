<script setup lang="ts">
import Home from "./pages/Home.vue";
import TheHeader from "./components/TheHeader.vue";
import TheFooter from "./components/TheFooter.vue";
</script>

<template>
  <TheHeader />
  <router-view></router-view>
  <TheFooter />
</template>

<style>
@import "bootstrap/dist/css/bootstrap.css";

body {
  height: 100vh;
}
</style>
