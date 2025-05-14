import { TaskManager } from './managers/TaskManager';

// Khởi tạo TaskManager
const taskManager = new TaskManager();

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
