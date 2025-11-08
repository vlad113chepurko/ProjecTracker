<script setup lang="ts">
import { useProjectStore } from "@/stores/useProjectStore";
import { defineProps } from "vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

// Project Details Logic
const route = useRoute();
const projectId = Number(route.params.id);
const projectStore = useProjectStore();

const localIsForm = ref<boolean>(false);
const props = defineProps<{
  isForm: boolean;
}>();

watch(
  () => props.isForm,
  (newVal) => {
    localIsForm.value = newVal;
  },
  { immediate: true }
);

const project = projectStore.getProjectById(projectId);
</script>

<template>
  <div class="app-content">
    <article>
      <h1 style="margin-bottom: 5px">Project: {{ project.ProjectName }}</h1>
      <p>Project Description: {{ project.ProjectDescription }}</p>
    </article>
    <button
      @click="
        () => {
          localIsForm = !localIsForm;
        }
      "
    >
      Add Task
    </button>
  </div>
</template>
