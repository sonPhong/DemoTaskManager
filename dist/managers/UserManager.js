"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const storage_1 = require("../utils/storage");
const debouncedSave_1 = require("../utils/debouncedSave"); // dùng hỗ trợ load file sau 1 time ko liên tục
const generateID_1 = require("../utils/generateID");
const USERS_FILE = './data/users.json';
class UserManager {
    // dùng debounce để giảm tần suất ghi file
    saveUsers() {
        (0, debouncedSave_1.debouncedSave)(USERS_FILE, this.users);
    }
    constructor() {
        this.users = (0, storage_1.loadData)(USERS_FILE);
    }
    // tạo user mới
    register(username, password, email, role) {
        const exists = this.users.find(u => u.username === username);
        if (exists)
            return null;
        const newUser = {
            id: (0, generateID_1.generateId)(),
            username,
            email,
            password,
            role
        };
        this.users.push(newUser);
        this.saveUsers();
        return newUser;
    }
    // check login
    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        return user || null;
    }
    // lấy hết
    getAllUsers() {
        return this.users;
    }
    // móc user theo id ra để dành kiểm tra
    getUserById(id) {
        return this.users.find(u => u.id === id) || null; // sửa từ ?? thành || test
    }
    // dùng partial để cập nhật thông tin user đưa về optional của User rồi muốn thêm gì thêm
    updateUser(id, updatedData) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1)
            return null;
        const updatedUser = { ...this.users[userIndex], ...updatedData };
        this.users[userIndex] = updatedUser;
        this.saveUsers();
        return updatedUser;
    }
    deleteUser(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1)
            return false;
        this.users.splice(userIndex, 1);
        this.saveUsers();
        return true;
    }
    // thêm hàm tìm kiếm user theo tên
    searchUserByName(name) {
        return this.users.filter(user => user.username.toLowerCase().includes(name.toLowerCase()));
    }
    // thêm hàm tìm kiếm user theo role
    searchUserByRole(role) {
        return this.users.filter(user => user.role === role);
    }
}
exports.UserManager = UserManager;
