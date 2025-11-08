<script setup lang="ts">
import { useProjectStore } from "@/stores/useProjectStore";
import { useFormStore } from "@/stores/useFormStore";
import { useRoute } from "vue-router";

// Project Details Logic
const route = useRoute();
const projectId = Number(route.params.id);
const projectStore = useProjectStore();

const formStore = useFormStore();

const project = projectStore.getProjectById(projectId);
</script>

<template>
  <div class="app-content">
    <article>
      <h1 style="margin-bottom: 5px">Project: {{ project.ProjectName }}</h1>
      <p>Project Description: {{ project.ProjectDescription }}</p>
    </article>
    <button @click="formStore.openForm()">Add Task</button>
  </div>
</template>
