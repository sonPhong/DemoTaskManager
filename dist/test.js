"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskManager_1 = require("./managers/TaskManager");
// Khởi tạo TaskManager
const taskManager = new TaskManager_1.TaskManager();
const task1 = {
    title: 'Task 1',
    assignedTo: ['user1'],
    createdBy: ['user2'],
};
const task2 = {
    title: 'Task 2',
    description: 'Description 2',
    assignedTo: ['user3'],
    createdBy: ['user4'],
};
taskManager.addAssignTask(task1.title, task1.assignedTo);
console.log('Task 1 added:', task1);
taskManager.addAssignTask(task2.title, task2.assignedTo);
