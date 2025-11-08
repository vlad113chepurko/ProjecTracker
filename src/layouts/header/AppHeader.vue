<script setup lang="ts">
import "./_Header.scss";
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <nav class="nav">
      <div class="logo">
        <img src="/VueTracker.png" alt="logo" />
        <p>Vue Tracker</p>
      </div>
      <RouterLink class="nav__button" to="/">Home</RouterLink>
      <RouterLink class="nav__button" to="/projects">Projects</RouterLink>
    </nav>
  </header>
</template>
