<script setup lang="ts">
import "./_ProjectSort.scss";
import ProjectSearchSort from "./ProjectSearchSort.vue";
import ProjectStatusSort from "./ProjectStatusSort.vue";
</script>

<template>
  <div style="width: 50%">
    <h2 style="margin-bottom: 10px">Sort</h2>
    <div class="sort">
      <ProjectSearchSort />
      <ProjectStatusSort />
    </div>
  </div>
</template>
