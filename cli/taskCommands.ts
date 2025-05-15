import inquirer from 'inquirer';
import { TaskManager } from '../managers/TaskManager';
import { UserManager } from '../managers/UserManager';
import { CreateTaskInput } from '../models/Task';
import { UserRole } from '../models/User';


// tạo ra hàm lấy thông tin người dùng nhập (chọn checkbox) và gọi hàm tạo task đưa thông tin về xử lý
export async function createTask(taskManager: TaskManager, userManager: UserManager) {

    // móc thông tin ra check
    const users = userManager.getAllUsers();
    const admins = users.filter(u => u.role === UserRole.ADMIN);
    const normalUsers = users.filter(u => u.role === UserRole.USER);

    if (admins.length === 0) {
        console.log('⚠️ Không có quản trị viên nào để tạo task.');
        return;
    }

    if (normalUsers.length === 0) {
        console.log('⚠️ Không có người dùng nào để nhận task.');
        return;
    }

    // lấy thông tin người nhập
    // xử dụng thư viện inquirer để tạo ra các câu hỏi và nhận thông tin từ người dùng (có checkbox) chọn nhiều cùng lúc không cần nhập)
    const answers: {
        title: string;
        description: string;
        assignedTo: string[];
        createdBy: string;
    } = await inquirer.prompt([
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

    // check lại kiểu dữ liệu để đưa về TaskManager.createTask xử lý
    const input: CreateTaskInput = {
        title: answers.title,
        description: answers.description,
        assignedTo: answers.assignedTo,
        createdBy: [answers.createdBy],
    };

    const newTask = taskManager.createTask(input);
    if (newTask) {
        console.log('✅ Tạo task thành công:', newTask);
    } else {
        console.log('❌ Tạo task thất bại do lỗi người dùng không hợp lệ.');
    }
}

export async function updateTaskStatus(taskManager: TaskManager) {
    const tasks = taskManager.getAllTasks();
    if (tasks.length === 0) {
        console.log('⚠️ Không có task để cập nhật.');
        return;
    }
    const { taskId } = await inquirer.prompt({
        name: 'taskId',
        type: 'list',
        message: 'Chọn task muốn cập nhật trạng thái:',
        choices: tasks.map(t => ({ name: t.title, value: t.id }))
    });

    const { status } = await inquirer.prompt({
        name: 'status',
        type: 'list',
        message: 'Chọn trạng thái mới:',
        choices: ['pending', 'in_progress', 'done']
    });

    const updatedTask = taskManager.updateTaskStatus(taskId, status as any);
    if (updatedTask) {
        console.log('✅ Cập nhật trạng thái thành công:', updatedTask);
    } else {
        console.log('❌ Cập nhật trạng thái thất bại.');
    }
}

export async function deleteTask(taskManager: TaskManager) {
    const tasks = taskManager.getAllTasks();
    if (tasks.length === 0) {
        console.log('⚠️ Không có task để xóa.');
        return;
    }

    const { taskId } = await inquirer.prompt({
        name: 'taskId',
        type: 'list',
        message: 'Chọn task muốn xóa:',
        choices: tasks.map(t => ({ name: t.title, value: t.id }))
    });

    const confirmed = await inquirer.prompt({
        name: 'confirm',
        type: 'confirm',
        message: 'Bạn có chắc chắn muốn xóa task này?'
    });

    if (confirmed.confirm) {
        const success = taskManager.deleteTask(taskId);
        console.log(success ? '✅ Xóa task thành công.' : '❌ Xóa task thất bại.');
    } else {
        console.log('❌ Hủy thao tác xóa task.');
    }
}
