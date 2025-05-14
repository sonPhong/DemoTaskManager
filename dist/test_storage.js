"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("./utils/storage");
const TASKS_FILE = './data/tasks.json';
const testTask = {
    id: 'task-1',
    title: 'Học TypeScript',
    assignedTo: ['user-1', 'user-2'],
    createdBy: ['user-3'],
    status: 'pending',
    createdAt: new Date().toISOString(),
};
const tasks = (0, storage_1.loadData)(TASKS_FILE);
tasks.push(testTask);
(0, storage_1.saveData)(TASKS_FILE, tasks);
console.log((0, storage_1.loadData)(TASKS_FILE));
