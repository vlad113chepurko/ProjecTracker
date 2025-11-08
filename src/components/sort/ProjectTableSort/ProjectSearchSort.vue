<script setup lang="ts">
import { ref, watch } from "vue";
import { useProjectStore } from "@/stores/useProjectStore";

const projectStore = useProjectStore();


const sortById = ref("Default");
const sortByName = ref("Default");
const sortByCount = ref("Default");


watch(sortById, (val: any) => {
  if (val !== "Default") projectStore.setSort(val);
});

watch(sortByName, (val: any) => {
  if (val !== "Default") projectStore.setSort(val);
});

watch(sortByCount, (val: any) => {
  if (val !== "Default") projectStore.setSort(val);
});
</script>

<template>
  <div class="sort__container">
    <div class="input__container">
      <label for="sortById">Sort by ID</label>
      <select v-model="sortById" id="sortById">
        <option value="Default">Default</option>
        <option value="idAsc">ID Ascending</option>
        <option value="idDesc">ID Descending</option>
      </select>
    </div>

    <div class="input__container">
      <label for="sortByName">Sort by Name</label>
      <select v-model="sortByName" id="sortByName">
        <option value="Default">Default</option>
        <option value="nameAsc">Name A-Z</option>
        <option value="nameDesc">Name Z-A</option>
      </select>
    </div>

    <div class="input__container">
      <label for="sortByCount">Sort by Count</label>
      <select v-model="sortByCount" id="sortByCount">
        <option value="Default">Default</option>
        <option value="countAsc">Count Ascending</option>
        <option value="countDesc">Count Descending</option>
      </select>
    </div>
  </div>
</template>
