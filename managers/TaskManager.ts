import { Task, TaskStatus } from '../models/Task';
import { loadData, saveData } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';
import { debouncedSave } from '../utils/debouncedSave'; // dùng hỗ trợ load file sau 1 time ko liên tục

// gọi generate random id
import { generateId } from '../utils/generateID';

const TASKS_FILE = './data/tasks.json';


// tạo interface cho đầu vào của hàm tạo task
interface CreateTaskInput {
    title: string;
    description?: string;
    assignedTo: string[];
    createdBy: string[];
}

export class TaskManager {
    private tasks: Task[];

    // dùng debounce để giảm tần suất ghi file
    private saveTasks() {
        debouncedSave(TASKS_FILE, this.tasks);
    }

    constructor() {
        this.tasks = loadData<Task>(TASKS_FILE);
    }


    // nghiên cứu thử xem có dùng decoration cho hàm này được không
    // dùng optional sai thêm input test và debug khai báo đầu vào

    // ====> tạo interface cho input( đầu vào của người dùng) để dễ quản lý và tránh bị ảnh hưởng lỗi optional khi chỉ cần nhập ít thông số còn lại là random)
    createTask(input: CreateTaskInput): Task {
        const { title, description, assignedTo, createdBy } = input;

        const newTask: Task = {
            id: generateId(),
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
    getAllTasks(): Task[] {
        return this.tasks;
    }

    // lấy task theo id trong list tasks đã tạo, dùng nullish coalescing operator (??) ==> TaskRepository and Circle
    getTaskById(id: string): Task | null {
        return this.tasks.find(task => task.id === id) || null; // sửa từ ?? thành || test
    }

    // thêm người được giao task, đưa id và mảng người được giao sau đó check 
    addAssignTask(id: string, assignedTo: string[]): Task | null {
        const task = this.getTaskById(id);
        if (!task) return null;

        // loại bỏ trùng lặp và test syntax (Set)
        task.assignedTo = [...new Set([...task.assignedTo, ...assignedTo])];
        this.saveTasks();
        return task;
    }

    // thay người được giao task sau đó thêm lại thằng mới
    replaceAssignTask(id: string, newAssignedTo: string[]): Task | null {
        const task = this.getTaskById(id);
        if (!task) return null;
        task.assignedTo = newAssignedTo;
        this.saveTasks();
        return task;
    }

    // lấy tất cả task của người dùng
    getTaskForUser(userId: string): Task[] {
        return this.tasks.filter(task => task.assignedTo.includes(userId));
    }

    // cập nhật trạng thái task
    updateTaskStatus(id: string, status: TaskStatus): Task | null {
        const task = this.getTaskById(id);
        if (!task) return null;

        task.status = status;
        this.saveTasks();
        return task;
    }

    // cập nhật task test Partial<T> để có thể cập nhật một phần của task ==> lấy hết interface của task để update
    // dùng Object.assign thử để cập nhật task (đối tượng sao chứa sao chép, đối tượng sao chép)
    updateTask(id: string, updatedTask: Partial<Task>): Task | null {
        const task = this.getTaskById(id);
        if (!task) return null;

        Object.assign(task, updatedTask);
        this.saveTasks();
        return task;
    }

    // xóa task
    deleteTask(id: string): boolean {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return false;

        this.tasks.splice(taskIndex, 1);
        this.saveTasks();
        return true;
    }

    // xóa nhiều task
    deleteTasks(ids: string[]): boolean {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => !ids.includes(task.id));
        this.saveTasks();
        return this.tasks.length < initialLength; // trả về true nếu có ít nhất 1 task bị xóa
    }

    // xóa tất cả task
    deleteAllTasks(): boolean {
        this.tasks = [];
        this.saveTasks();
        return true;
    }



}


