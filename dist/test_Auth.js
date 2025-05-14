"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthManager_1 = require("./managers/AuthManager");
const auth = new AuthManager_1.AuthManager();
// Đăng ký người dùng
const u1 = auth.register('alice', 'alice@123.com', '123456', 'admin');
console.log('Đăng ký:', u1 ?? 'Username đã tồn tại');
// Thử đăng nhập
const login = auth.login('alice', '1234562');
console.log('Đăng nhập:', login ?? 'Sai thông tin đăng nhập');
