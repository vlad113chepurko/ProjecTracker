<script setup lang="ts">
import { ref, watch } from "vue";
import { useProjectStore } from "@/stores/useProjectStore";
const projectStore = useProjectStore();
const sortByStatus = ref(projectStore.selectedStatus);

watch(sortByStatus, (newVal) => {
  projectStore.setStatusFilter(newVal);
  projectStore.updateFiltered();
});
</script>

<template>
  <div class="input__container">
    <label for="sortStatus">Sort by Status</label>
    <select name="sortStatus" id="sortStatus" v-model="sortByStatus">
      <option value="All">All</option>
      <option value="Active">Active</option>
      <option value="Completed">Completed</option>
    </select>
  </div>
</template>
