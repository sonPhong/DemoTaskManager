"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.searchUser = searchUser;
const inquirer_1 = __importDefault(require("inquirer"));
const User_1 = require("../models/User");
async function registerUser(userManager) {
    const answers = await inquirer_1.default.prompt([
        { name: 'username', type: 'input', message: 'Tên đăng nhập:' },
        { name: 'password', type: 'password', message: 'Mật khẩu:' },
        { name: 'email', type: 'input', message: 'Email:' },
        {
            name: 'role',
            type: 'list',
            message: 'Chọn vai trò:',
            choices: [
                { name: 'Quản trị viên (admin)', value: User_1.UserRole.ADMIN },
                { name: 'Người dùng thường (user)', value: User_1.UserRole.USER }
            ]
        }
    ]);
    const user = userManager.register(answers.username, answers.password, answers.email, answers.role);
    if (user) {
        console.log('✅ Đăng ký thành công:', user);
    }
    else {
        console.log('❌ Tên người dùng đã tồn tại.');
    }
}
async function updateUser(userManager) {
    const users = userManager.getAllUsers();
    if (users.length === 0) {
        console.log('⚠️ Không có người dùng để cập nhật.');
        return;
    }
    const { userId } = await inquirer_1.default.prompt({
        name: 'userId',
        type: 'list',
        message: 'Chọn người dùng muốn cập nhật:',
        choices: users.map(u => ({ name: u.username, value: u.id }))
    });
    const user = userManager.getUserById(userId);
    if (!user) {
        console.log('❌ Người dùng không tồn tại.');
        return;
    }
    const answers = await inquirer_1.default.prompt([
        { name: 'email', type: 'input', message: `Email mới (hiện tại: ${user.email}):`, default: user.email },
        { name: 'password', type: 'password', message: 'Mật khẩu mới (để trống nếu không đổi):' },
        {
            name: 'role',
            type: 'list',
            message: 'Vai trò mới:',
            choices: [
                { name: 'Quản trị viên (admin)', value: User_1.UserRole.ADMIN },
                { name: 'Người dùng thường (user)', value: User_1.UserRole.USER }
            ],
            default: user.role
        }
    ]);
    const updatedData = {
        email: answers.email,
        role: answers.role,
    };
    if (answers.password.trim() !== '') {
        updatedData.password = answers.password;
    }
    const updatedUser = userManager.updateUser(userId, updatedData);
    if (updatedUser) {
        console.log('✅ Cập nhật thành công:', updatedUser);
    }
    else {
        console.log('❌ Cập nhật thất bại.');
    }
}
async function deleteUser(userManager) {
    const users = userManager.getAllUsers();
    if (users.length === 0) {
        console.log('⚠️ Không có người dùng để xóa.');
        return;
    }
    const { userId } = await inquirer_1.default.prompt({
        name: 'userId',
        type: 'list',
        message: 'Chọn người dùng muốn xóa:',
        choices: users.map(u => ({ name: u.username, value: u.id }))
    });
    const confirmed = await inquirer_1.default.prompt({
        name: 'confirm',
        type: 'confirm',
        message: 'Bạn có chắc chắn muốn xóa người dùng này?'
    });
    if (confirmed.confirm) {
        const success = userManager.deleteUser(userId);
        console.log(success ? '✅ Xóa thành công.' : '❌ Xóa thất bại.');
    }
    else {
        console.log('❌ Hủy thao tác xóa.');
    }
}
async function searchUser(userManager) {
    const { searchBy } = await inquirer_1.default.prompt({
        name: 'searchBy',
        type: 'list',
        message: 'Tìm kiếm người dùng theo:',
        choices: [
            { name: 'Tên đăng nhập', value: 'name' },
            { name: 'Vai trò', value: 'role' }
        ]
    });
    if (searchBy === 'name') {
        const { name } = await inquirer_1.default.prompt({
            name: 'name',
            type: 'input',
            message: 'Nhập tên đăng nhập hoặc một phần tên:'
        });
        const results = userManager.searchUserByName(name);
        if (results.length > 0) {
            console.table(results);
        }
        else {
            console.log('⚠️ Không tìm thấy người dùng nào.');
        }
    }
    else {
        const { role } = await inquirer_1.default.prompt({
            name: 'role',
            type: 'list',
            message: 'Chọn vai trò:',
            choices: [
                { name: 'Quản trị viên (admin)', value: User_1.UserRole.ADMIN },
                { name: 'Người dùng thường (user)', value: User_1.UserRole.USER }
            ]
        });
        const results = userManager.searchUserByRole(role);
        if (results.length > 0) {
            console.table(results);
        }
        else {
            console.log('⚠️ Không tìm thấy người dùng nào.');
        }
    }
}
