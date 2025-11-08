<script setup lang="ts">
import "../addProject/_AddProjects.scss";
import { ref } from "vue";
import type { Task } from "@/interfaces/index";
import { useTasksStore } from "@/stores/useTasksStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { useRoute } from "vue-router";
import { useModalStore } from "@/stores/useModalStore";

const route = useRoute();
const projectIdFromRoute = Number(route.params.id) || 0;
const taskStore = useTasksStore();
const tasks = taskStore.tasks;
const modalStore = useModalStore();

const projectStore = useProjectStore();
const projects = projectStore.projects;

const newTask = ref<Task>({
  ID: tasks.length > 0 ? Math.max(...tasks.map((t) => t.ID)) + 1 : 1,
  TaskName: "",
  TaskAuthor: "",
  TaskStatus: "todo",
  TaskDeadline: new Date().toString().split("T")[0],
  ProjectID: projectIdFromRoute,
});

const onSubmit = () => {
  const taskToAdd = { ...newTask.value };

  taskStore.addTask(taskToAdd);

  modalStore.createModal(`Task ${taskToAdd.TaskName} was created!`);

  const projectIndex = projects.findIndex((p) => p.ID === taskToAdd.ProjectID);
  if (projectIndex !== -1) {
    const project = projects[projectIndex];

    const updatedTasks = project!.Tasks
      ? [...project!.Tasks, taskToAdd]
      : [taskToAdd];

    projects[projectIndex] = {
      ID: project!.ID,
      ProjectName: project!.ProjectName,
      ProjectDescription: project!.ProjectDescription,
      Status: project!.Status,
      CreateAt: project!.CreateAt,
      Tasks: updatedTasks,
      TaskCounter: updatedTasks.length,
    };
  }

  newTask.value = {
    ID: tasks.length > 0 ? Math.max(...tasks.map((t) => t.ID)) + 1 : 1,
    TaskName: "",
    TaskAuthor: "",
    TaskStatus: "todo",
    TaskDeadline: new Date().toISOString().split("T")[0],
    ProjectID: projectIdFromRoute,
  };
};
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <h2>Add New Task</h2>
    <button @click="$emit('close')" type="button" class="form__close">
      <span>X</span>
    </button>
    <label for="taskName">Task Name</label>
    <input
      v-model="newTask.TaskName"
      type="text"
      name="taskName"
      id="taskName"
      placeholder="Enter task name"
      required
    />
    <label for="taskAuthor">Author</label>
    <select name="taskAuthor" id="taskAuthor" v-model="newTask.TaskAuthor">
      <option value="Alice">Alice</option>
      <option value="Bob">Bob</option>
      <option value="Charlie">Charlie</option>
    </select>
    <label for="taskName">Task Status</label>
    <select name="status" id="taskStatus" v-model="newTask.TaskStatus">
      <option value="Todo">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
    <label for="taskDeadline">Deadline</label>
    <input
      type="date"
      name="taskDeadline"
      id="taskDeadline"
      v-model="newTask.TaskDeadline"
      required
    />
    <button class="form__add" type="submit">Add Task</button>
  </form>
</template>
