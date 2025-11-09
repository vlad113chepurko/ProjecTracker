import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
  state: () => ({
    isFormOpen: false,
    isUpdateFormOpen: false,
    isUpdateTaskOpen: false,
  }),
  actions: {
    openForm() {
      this.isFormOpen = true;
    },
    closeForm() {
      this.isFormOpen = false;
    },
    openUpdateForm() {
      this.isUpdateFormOpen = true;
    },
    closeUpdateForm() {
      this.isUpdateFormOpen = false;
    },
    openUpdateTask() {
      this.isUpdateTaskOpen = true;
    },
    closeUpdateTask() {
      this.isUpdateTaskOpen = false;
    },
  },
});
