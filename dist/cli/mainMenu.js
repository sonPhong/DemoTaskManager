"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenu = mainMenu;
const inquirer_1 = __importDefault(require("inquirer"));
const UserManager_1 = require("../managers/UserManager");
const TaskManager_1 = require("../managers/TaskManager");
const userCommands_1 = require("./userCommands");
const taskCommands_1 = require("./taskCommands");
async function mainMenu() {
    const userManager = new UserManager_1.UserManager();
    const taskManager = new TaskManager_1.TaskManager(userManager);
    while (true) {
        const { choice } = await inquirer_1.default.prompt([
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
                await (0, userCommands_1.registerUser)(userManager);
                break;
            case '2. Cập nhật người dùng':
                await (0, userCommands_1.updateUser)(userManager);
                break;
            case '3. Xóa người dùng':
                await (0, userCommands_1.deleteUser)(userManager);
                break;
            case '4. Tìm kiếm người dùng':
                await (0, userCommands_1.searchUser)(userManager);
                break;
            case '5. Tạo task mới':
                await (0, taskCommands_1.createTask)(taskManager, userManager);
                break;
            case '6. Cập nhật trạng thái task':
                await (0, taskCommands_1.updateTaskStatus)(taskManager);
                break;
            case '7. Xóa task':
                await (0, taskCommands_1.deleteTask)(taskManager);
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
