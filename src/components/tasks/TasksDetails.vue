<script setup lang="ts">
import "./_ProjectDetails.scss";
import { ref } from "vue";

// Filters and Sorters
import TasksTableSort from "../sort/tasks-table-sort/TasksTableSort.vue";
import TasksFilter from "../filters/tasks-table-filter/TasksFilter.vue";

// Components
import { components } from "@/components/index";
import TasksTable from "./TasksTable.vue";
import TasksDetailsHeader from "./TasksDetailsHeader.vue";

// Logic
const isForm = ref<boolean>(false);
</script>

<template>
  <div class="project-wrapper">
    <TasksDetailsHeader :isForm="isForm" />
    <div class="app-filter-sort">
      <TasksFilter />
      <TasksTableSort />
    </div>
    <TasksTable />
  </div>
  <components.AddTask
    v-if="isForm"
    @close="
      () => {
        isForm = false;
      }
    "
  />
</template>
