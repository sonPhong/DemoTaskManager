"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
const storage_1 = require("../utils/storage");
const debouncedSave_1 = require("../utils/debouncedSave"); // dùng hỗ trợ load file sau 1 time ko liên tục
// gọi generate random id
const generateID_1 = require("../utils/generateID");
const TASKS_FILE = './data/tasks.json';
class TaskManager {
    // dùng debounce để giảm tần suất ghi file
    saveTasks() {
        (0, debouncedSave_1.debouncedSave)(TASKS_FILE, this.tasks);
    }
    constructor() {
        this.tasks = (0, storage_1.loadData)(TASKS_FILE);
    }
    // nghiên cứu thử xem có dùng decoration cho hàm này được không
    // dùng optional sai thêm input test và debug khai báo đầu vào
    // ====> tạo interface cho input( đầu vào của người dùng) để dễ quản lý và tránh bị ảnh hưởng lỗi optional khi chỉ cần nhập ít thông số còn lại là random)
    createTask(input) {
        const { title, description, assignedTo, createdBy } = input;
        const newTask = {
            id: (0, generateID_1.generateId)(),
            title,
            ...(description && { description }),
            assignedTo,
            createdBy,
            createdAt: new Date().toISOString(),
            status: 'pending',
        };
        this.tasks.push(newTask);
        this.saveTasks();
        return newTask;
    }
    // lấy tất cả task
    getAllTasks() {
        return this.tasks;
    }
    // lấy task theo id trong list tasks đã tạo, dùng nullish coalescing operator (??) ==> TaskRepository and Circle
    getTaskById(id) {
        return this.tasks.find(task => task.id === id) || null; // sửa từ ?? thành || test
    }
    // thêm người được giao task, đưa id và mảng người được giao sau đó check 
    addAssignTask(id, assignedTo) {
        const task = this.getTaskById(id);
        if (!task)
            return null;
        // loại bỏ trùng lặp và test syntax (Set)
        task.assignedTo = [...new Set([...task.assignedTo, ...assignedTo])];
        this.saveTasks();
        return task;
    }
    // thay người được giao task sau đó thêm lại thằng mới
    replaceAssignTask(id, newAssignedTo) {
        const task = this.getTaskById(id);
        if (!task)
            return null;
        task.assignedTo = newAssignedTo;
        this.saveTasks();
        return task;
    }
    // lấy tất cả task của người dùng
    getTaskForUser(userId) {
        return this.tasks.filter(task => task.assignedTo.includes(userId));
    }
    // cập nhật trạng thái task
    updateTaskStatus(id, status) {
        const task = this.getTaskById(id);
        if (!task)
            return null;
        task.status = status;
        this.saveTasks();
        return task;
    }
    // cập nhật task test Partial<T> để có thể cập nhật một phần của task ==> lấy hết interface của task để update
    // dùng Object.assign thử để cập nhật task (đối tượng sao chứa sao chép, đối tượng sao chép)
    updateTask(id, updatedTask) {
        const task = this.getTaskById(id);
        if (!task)
            return null;
        Object.assign(task, updatedTask);
        this.saveTasks();
        return task;
    }
    // xóa task
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1)
            return false;
        this.tasks.splice(taskIndex, 1);
        this.saveTasks();
        return true;
    }
    // xóa nhiều task
    deleteTasks(ids) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => !ids.includes(task.id));
        this.saveTasks();
        return this.tasks.length < initialLength; // trả về true nếu có ít nhất 1 task bị xóa
    }
    // xóa tất cả task
    deleteAllTasks() {
        this.tasks = [];
        this.saveTasks();
        return true;
    }
}
exports.TaskManager = TaskManager;
