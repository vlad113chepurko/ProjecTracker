import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
  state: () => ({
    isFormOpen: false,
  }),
  actions: {
    openForm() {
      this.isFormOpen = true;
    },
    closeForm() {
      this.isFormOpen = false;
    },
  },
});
