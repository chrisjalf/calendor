<script setup lang="ts">
import Home from "./pages/Home.vue";
import TheHeader from "./components/TheHeader.vue";
</script>

<template>
  <TheHeader />
  <router-view></router-view>
</template>

<style>
@import "bootstrap/dist/css/bootstrap.css";

body {
  height: 100vh;
}
</style>
