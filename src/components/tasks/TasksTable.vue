<script setup lang="ts">
import "@/components/projects/_ProjectsTable.scss";
import { ref, watch, onMounted } from "vue";
import { useTasksStore } from "@/stores/useTasksStore";
import { useRoute } from "vue-router";
import draggable from "vuedraggable";

const route = useRoute();
const tasksStore = useTasksStore();

const tasks = ref<Array<any>>([]);

onMounted(() => {
  const id = Number(route.params.id);
  if (!isNaN(id)) tasksStore.currentProjectId = id;
});

watch(
  () => tasksStore.filteredTasks,
  (newTasks) => {
    tasks.value = [...newTasks];
  },
  { immediate: true }
);
</script>

<template>
  <div class="table__container">
    <div class="table__header">
      <div class="table__row table__row--header">
        <div class="table__cell">ID</div>
        <div class="table__cell">Task Name</div>
        <div class="table__cell">Author</div>
        <div class="table__cell">Status</div>
        <div class="table__cell">Deadline</div>
      </div>
    </div>

    <draggable v-model="tasks" tag="div" class="table__body" :animation="200">
      <template #item="{ element: task }">
        <div class="table__row">
          <div class="table__cell">{{ task.ID }}</div>
          <div class="table__cell">{{ task.TaskName }}</div>
          <div class="table__cell">{{ task.TaskAuthor }}</div>
          <div class="table__cell">{{ task.TaskStatus }}</div>
          <div class="table__cell">{{ task.TaskDeadline }}</div>
        </div>
      </template>
    </draggable>
  </div>
</template>
