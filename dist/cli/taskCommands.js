"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = createTask;
exports.updateTaskStatus = updateTaskStatus;
exports.deleteTask = deleteTask;
const inquirer_1 = __importDefault(require("inquirer"));
const User_1 = require("../models/User");
async function createTask(taskManager, userManager) {
    const users = userManager.getAllUsers();
    const admins = users.filter(u => u.role === User_1.UserRole.ADMIN);
    const normalUsers = users.filter(u => u.role === User_1.UserRole.USER);
    if (admins.length === 0) {
        console.log('⚠️ Không có quản trị viên nào để tạo task.');
        return;
    }
    if (normalUsers.length === 0) {
        console.log('⚠️ Không có người dùng nào để nhận task.');
        return;
    }
    const answers = await inquirer_1.default.prompt([
        { name: 'title', type: 'input', message: 'Tên task:' },
        { name: 'description', type: 'input', message: 'Mô tả task (tuỳ chọn):' },
        {
            name: 'assignedTo',
            type: 'checkbox',
            message: 'Chọn người được giao (chỉ người dùng thường):',
            choices: normalUsers.map(u => ({ name: u.username, value: u.id }))
        },
        {
            name: 'createdBy',
            type: 'list',
            message: 'Chọn người tạo task (chỉ admin):',
            choices: admins.map(u => ({ name: u.username, value: u.id }))
        }
    ]);
    const input = {
        title: answers.title,
        description: answers.description,
        assignedTo: answers.assignedTo,
        createdBy: [answers.createdBy],
    };
    const newTask = taskManager.createTask(input);
    if (newTask) {
        console.log('✅ Tạo task thành công:', newTask);
    }
    else {
        console.log('❌ Tạo task thất bại do lỗi người dùng không hợp lệ.');
    }
}
async function updateTaskStatus(taskManager) {
    const tasks = taskManager.getAllTasks();
    if (tasks.length === 0) {
        console.log('⚠️ Không có task để cập nhật.');
        return;
    }
    const { taskId } = await inquirer_1.default.prompt({
        name: 'taskId',
        type: 'list',
        message: 'Chọn task muốn cập nhật trạng thái:',
        choices: tasks.map(t => ({ name: t.title, value: t.id }))
    });
    const { status } = await inquirer_1.default.prompt({
        name: 'status',
        type: 'list',
        message: 'Chọn trạng thái mới:',
        choices: ['pending', 'in_progress', 'done']
    });
    const updatedTask = taskManager.updateTaskStatus(taskId, status);
    if (updatedTask) {
        console.log('✅ Cập nhật trạng thái thành công:', updatedTask);
    }
    else {
        console.log('❌ Cập nhật trạng thái thất bại.');
    }
}
async function deleteTask(taskManager) {
    const tasks = taskManager.getAllTasks();
    if (tasks.length === 0) {
        console.log('⚠️ Không có task để xóa.');
        return;
    }
    const { taskId } = await inquirer_1.default.prompt({
        name: 'taskId',
        type: 'list',
        message: 'Chọn task muốn xóa:',
        choices: tasks.map(t => ({ name: t.title, value: t.id }))
    });
    const confirmed = await inquirer_1.default.prompt({
        name: 'confirm',
        type: 'confirm',
        message: 'Bạn có chắc chắn muốn xóa task này?'
    });
    if (confirmed.confirm) {
        const success = taskManager.deleteTask(taskId);
        console.log(success ? '✅ Xóa task thành công.' : '❌ Xóa task thất bại.');
    }
    else {
        console.log('❌ Hủy thao tác xóa task.');
    }
}
