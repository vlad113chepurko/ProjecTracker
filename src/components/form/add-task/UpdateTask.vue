<script setup lang="ts">
import "../add-project/_AddProjects.scss";
import { reactive, watch } from "vue";
import type { Task } from "@/types/task.type";
import { useFormStore } from "@/stores/useFormStore";
import { useTasksStore } from "@/stores/useTasksStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { Field } from "vee-validate";
import { TaskService } from "@/services/tasks.service";

const formStore = useFormStore();
const tasksStore = useTasksStore();
const projectsStore = useProjectStore();
const updatedTask = reactive<Task>({
  ID: 0,
  TaskName: "",
  TaskAuthor: "",
  TaskStatus: "",
  TaskDeadline: "",
  ProjectID: 0,
});

watch(
  () => tasksStore.taskToEdit,
  (task) => {
    if (task) Object.assign(updatedTask, task);
  },
  { immediate: true }
);
</script>

<template>
  <form
    class="form"
    @submit.prevent="
      TaskService.updateTask(updatedTask, projectsStore.projects)
    "
  >
    <h2>Update Task</h2>
    <button
      @click="formStore.closeUpdateTask()"
      type="button"
      class="form__close"
    >
      <span>X</span>
    </button>
    <label for="taskName">Update Task Name</label>
    <Field
      as="input"
      v-model="updatedTask.TaskName"
      name="taskName"
      id="taskName"
      placeholder="Enter task name"
      rules="required"
      required
    />
    <label for="taskAuthor">Update Author</label>
    <Field
      as="select"
      name="taskAuthor"
      id="taskAuthor"
      v-model="updatedTask.TaskAuthor"
      rules="required"
    >
      <option value="Alice">Alice</option>
      <option value="Bob">Bob</option>
      <option value="Charlie">Charlie</option>
    </Field>
    <label for="taskName">Update Task Status</label>
    <Field
      as="select"
      name="status"
      id="taskStatus"
      v-model="updatedTask.TaskStatus"
      rules="required"
    >
      <option value="Todo">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </Field>
    <label for="taskDeadline">Deadline</label>
    <Field
      as="input"
      type="date"
      name="taskDeadline"
      id="taskDeadline"
      v-model="updatedTask.TaskDeadline"
      required
    />
    <button class="form__add" type="submit">Update Task</button>
  </form>
</template>
