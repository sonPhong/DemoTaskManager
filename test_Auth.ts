import { AuthManager } from './managers/AuthManager';

const auth = new AuthManager();

// Đăng ký người dùng
const u1 = auth.register('alice','alice@123.com', '123456', 'admin');
console.log('Đăng ký:', u1 ?? 'Username đã tồn tại');

// Thử đăng nhập
const login = auth.login('alice', '1234562');
console.log('Đăng nhập:', login ?? 'Sai thông tin đăng nhập');
