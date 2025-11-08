<script setup lang="ts">
import { ref, watch } from "vue";
import { useProjectStore } from "@/stores/useProjectStore";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const projectStore = useProjectStore();

const chartData = ref({
  labels: [] as string[],
  datasets: [
    {
      label: "Tasks per Project",
      data: [] as number[],
      backgroundColor: [
        "#42A5F5",
        "#66BB6A",
        "#FFA726",
        "#AB47BC",
        "#FF7043",
        "#26A69A",
      ],
    },
  ],
});

const updateChartData = () => {
  chartData.value.labels = projectStore.projects.map((p) => p.ProjectName);
  chartData.value.datasets[0]!.data = projectStore.projects.map(
    (p) => p.TaskCounter
  );
};

watch(
  () => projectStore.projects,
  () => {
    updateChartData();
  },
  { deep: true, immediate: true }
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Projects & Tasks Overview",
    },
  },
};
</script>

<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 700px;
  margin: 40px auto;
}
</style>
