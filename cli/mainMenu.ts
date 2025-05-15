import inquirer from 'inquirer';
import { UserManager } from '../managers/UserManager';
import { TaskManager } from '../managers/TaskManager';
import {
    registerUser,
    updateUser,
    deleteUser,
    searchUser
} from './userCommands';
import {
    createTask,
    updateTaskStatus,
    deleteTask
} from './taskCommands';

export async function mainMenu() {
    const userManager = new UserManager();
    const taskManager = new TaskManager(userManager);

    while (true) {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Chọn chức năng:',
                choices: [
                    '1. Đăng ký người dùng',
                    '2. Cập nhật người dùng',
                    '3. Xóa người dùng',
                    '4. Tìm kiếm người dùng',
                    '5. Tạo task mới',
                    '6. Cập nhật trạng thái task',
                    '7. Xóa task',
                    '8. Xem tất cả task',
                    '9. Xem tất cả người dùng',
                    '10. Thoát'
                ]
            }
        ]);

        switch (choice) {
            case '1. Đăng ký người dùng':
                await registerUser(userManager);
                break;
            case '2. Cập nhật người dùng':
                await updateUser(userManager);
                break;
            case '3. Xóa người dùng':
                await deleteUser(userManager);
                break;
            case '4. Tìm kiếm người dùng':
                await searchUser(userManager);
                break;
            case '5. Tạo task mới':
                await createTask(taskManager, userManager);
                break;
            case '6. Cập nhật trạng thái task':
                await updateTaskStatus(taskManager);
                break;
            case '7. Xóa task':
                await deleteTask(taskManager);
                break;
            case '8. Xem tất cả task':
                console.table(taskManager.getAllTasks());
                break;
            case '9. Xem tất cả người dùng':
                console.table(userManager.getAllUsers());
                break;
            case '10. Thoát':
                console.log('Tạm biệt!');
                process.exit(0);
        }
    }
}
