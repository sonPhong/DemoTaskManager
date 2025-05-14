import { Task } from './models/Task';
import { saveData, loadData } from './utils/storage';

const TASKS_FILE = './data/tasks.json';

const testTask: Task = {
  id: 'task-1',
  title: 'Học TypeScript',
  assignedTo: ['user-1', 'user-2'],
  createdBy: ['user-3'],
  status: 'pending',
  createdAt: new Date().toISOString(),
};

const tasks = loadData<Task>(TASKS_FILE);
tasks.push(testTask);
saveData(TASKS_FILE, tasks);

console.log(loadData<Task>(TASKS_FILE));
