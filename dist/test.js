"use strict";
// import inquirer from 'inquirer';
// import { UserManager } from '../managers/UserManager';
// import { TaskManager } from '../managers/TaskManager';
// import { CreateTaskInput } from '../models/Task';
// import { UserRole } from '../models/User';
// const userManager = new UserManager();
// const taskManager = new TaskManager(userManager);
// async function mainMenu() {
//     while (true) {
//         const { choice } = await inquirer.prompt([
//             {
//                 type: 'list',
//                 name: 'choice',
//                 message: 'Chọn chức năng:',
//                 choices: [
//                     '1. Đăng ký người dùng',
//                     '2. Tạo task mới',
//                     '3. Xem tất cả task',
//                     '4. Xem tất cả người dùng',
//                     '5. Thoát'
//                 ]
//             }
//         ]);
//         switch (choice) {
//             case '1. Đăng ký người dùng':
//                 await registerUser();
//                 break;
//             case '2. Tạo task mới':
//                 await createTask();
//                 break;
//             case '3. Xem tất cả task':
//                 console.table(taskManager.getAllTasks());
//                 break;
//             case '4. Xem tất cả người dùng':
//                 console.table(userManager.getAllUsers());
//                 break;
//             case '5. Thoát':
//                 console.log('Tạm biệt!');
//                 process.exit(0);
//         }
//     }
// }
// async function registerUser() {
//     const answers: {
//         username: string;
//         password: string;
//         email: string;
//         role: UserRole;
//     } = await inquirer.prompt([
//         { name: 'username', type: 'input', message: 'Tên đăng nhập:' },
//         { name: 'password', type: 'password', message: 'Mật khẩu:' },
//         { name: 'email', type: 'input', message: 'Email:' },
//         {
//             name: 'role',
//             type: 'list',
//             message: 'Chọn vai trò:',
//             choices: [
//                 { name: 'Quản trị viên (admin)', value: UserRole.ADMIN },
//                 { name: 'Người dùng thường (user)', value: UserRole.USER }
//             ]
//         }
//     ]);
//     const user = userManager.register(
//         answers.username,
//         answers.password,
//         answers.email,
//         answers.role
//     );
//     if (user) {
//         console.log('✅ Đăng ký thành công:', user);
//     } else {
//         console.log('❌ Tên người dùng đã tồn tại.');
//     }
// }
// async function createTask() {
//     const users = userManager.getAllUsers();
//     const admins = users.filter(u => u.role === UserRole.ADMIN);
//     const normalUsers = users.filter(u => u.role === UserRole.USER);
//     if (admins.length === 0) {
//         console.log('⚠️ Không có quản trị viên nào để tạo task.');
//         return;
//     }
//     if (normalUsers.length === 0) {
//         console.log('⚠️ Không có người dùng nào để nhận task.');
//         return;
//     }
//     const answers: {
//         title: string;
//         description: string;
//         assignedTo: string[];
//         createdBy: string;
//     } = await inquirer.prompt([
//         { name: 'title', type: 'input', message: 'Tên task:' },
//         { name: 'description', type: 'input', message: 'Mô tả task (tuỳ chọn):' },
//         {
//             name: 'assignedTo',
//             type: 'checkbox',
//             message: 'Chọn người được giao (chỉ người dùng thường):',
//             choices: normalUsers.map(u => ({ name: u.username, value: u.id }))
//         },
//         {
//             name: 'createdBy',
//             type: 'list',
//             message: 'Chọn người tạo task (chỉ admin):',
//             choices: admins.map(u => ({ name: u.username, value: u.id }))
//         }
//     ]);
//     const input: CreateTaskInput = {
//         title: answers.title,
//         description: answers.description,
//         assignedTo: answers.assignedTo,
//         createdBy: [answers.createdBy],
//     };
//     const newTask = taskManager.createTask(input);
//     if (newTask) {
//         console.log('✅ Tạo task thành công:', newTask);
//     } else {
//         console.log('❌ Tạo task thất bại do lỗi người dùng không hợp lệ.');
//     }
// }
// mainMenu();
