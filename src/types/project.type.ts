export interface Project {
  ID: number;
  ProjectName: string;
  ProjectDescription: string;
  TaskCounter: number;
  Status: string;
  CreateAt: string;
  Tasks: Task[];
}