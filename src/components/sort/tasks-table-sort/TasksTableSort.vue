<script setup lang="ts">
import "@/components/sort/project-table-sort/_ProjectSort.scss";
import { tasksFilters } from "@/components/filters/tasks-table-filter/components/index";
import TasksDateSort from "./TasksDateSort.vue";
</script>

<template>
  <div style="width: 50%">
    <h2 style="margin-bottom: 10px;">Sort</h2>
    <div class="sort">
      <tasksFilters.TasksStatusFilter />
      <TasksDateSort />
    </div>
  </div>
</template>
