import type { Task } from "@/types/task.type";
import { useTasksStore } from "@/stores/useTasksStore";
import { useModalStore } from "@/stores/useModalStore";
import { useProjectStore } from "@/stores/useProjectStore";
import axios from "axios";

class TaskService {
  static addTaskToProject(newTask: Task, projects: Array<any>) {
    const taskStore = useTasksStore();
    const modalStore = useModalStore();

    axios
      .post("http://localhost:3000/tasks/create", newTask)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error creating the task!", error);
      });

    taskStore.addTask(newTask);

    modalStore.createModal(`Task ${newTask.TaskName} was created!`);

    const projectIndex = projects.findIndex((p) => p.ID === newTask.ProjectID);
    if (projectIndex !== -1) {
      const project = projects[projectIndex];

      const updatedTasks = project!.Tasks
        ? [...project!.Tasks, newTask]
        : [newTask];

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
  }

  static deleteTaskById(taskId: number) {
    const taskStore = useTasksStore();
    const projectStore = useProjectStore();
    const modalStore = useModalStore();
    const deletedTask = taskStore.tasks.find((t) => t.ID === taskId);

    axios
      .delete(`http://localhost:3000/tasks/delete/${taskId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });

    taskStore.deleteTask(taskId);
    if (deletedTask) {
      const project = projectStore.projects.find(
        (p: any) => p.ID === deletedTask.ProjectID
      );
      if (project && project.TaskCounter > 0) {
        project.TaskCounter--;
        localStorage.setItem("projects", JSON.stringify(projectStore.projects));
      }
    }

    modalStore.createModal(`Task with ID ${taskId} was deleted!`);
  }

  static updateTask(updatedTask: Task, projects: Array<any>) {
    const taskStore = useTasksStore();
    const modalStore = useModalStore();

    axios
      .put(`http://localhost:3000/tasks/update/${updatedTask.ID}`, updatedTask)
      .then((response) => {
        console.log("Task updated:", response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the task!", error);
      });

    taskStore.updateTask(updatedTask);

    const projectIndex = projects.findIndex(
      (p) => p.ID === updatedTask.ProjectID
    );

    if (projectIndex !== -1) {
      const project = projects[projectIndex];
      const updatedTasks = project.Tasks.map((task: Task) =>
        task.ID === updatedTask.ID ? updatedTask : task
      );

      Object.assign(project, {
        Tasks: updatedTasks,
        TaskCounter: updatedTasks.length,
      });
    }

    modalStore.createModal(`Task "${updatedTask.TaskName}" was updated!`);
  }
}
export { TaskService };
