"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
const storage_1 = require("../utils/storage");
const debouncedSave_1 = require("../utils/debouncedSave"); // dùng hỗ trợ load file sau 1 time ko liên tục
const generateID_1 = require("../utils/generateID");
// gọi thư viện dùng tạo id 
// import { v4 as uuidv4 } from 'uuid';
const USERS_FILE = './data/users.json';
class AuthManager {
    // dùng debounce để giảm tần suất ghi file
    saveUsers() {
        (0, debouncedSave_1.debouncedSave)(USERS_FILE, this.users);
    }
    constructor() {
        this.users = (0, storage_1.loadData)(USERS_FILE);
    }
    register(username, password, email, role) {
        const exists = this.users.find(u => u.username === username);
        if (exists)
            return null;
        const newUser = {
            id: (0, generateID_1.generateId)(), // dùng hàm generateId() để tạo id
            username,
            email,
            password,
            role
        };
        this.users.push(newUser);
        this.saveUsers();
        return newUser;
    }
    login(username, password) {
        return this.users.find(u => u.username === username && u.password === password) ?? null;
    }
    getAllUsers() {
        return this.users;
    }
}
exports.AuthManager = AuthManager;
