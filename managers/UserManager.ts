import { UserRole, User } from "../models/User";
import { loadData, saveData } from "../utils/storage";
import { debouncedSave } from "../utils/debouncedSave"; // dùng hỗ trợ load file sau 1 time ko liên tục
import { generateId } from "../utils/generateID";

const USERS_FILE = './data/users.json';
export class UserManager {
    private users: User[];

    // dùng debounce để giảm tần suất ghi file
    private saveUsers() {
        debouncedSave(USERS_FILE, this.users);
    }

    constructor() {
        this.users = loadData<User>(USERS_FILE);
    }

    // tạo user mới
    register(username: string, password: string, email: string, role: UserRole): User | null {
        const exists = this.users.find(u => u.username === username);
        if (exists) return null;

        const newUser: User = {
            id: generateId(),
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
    login(username: string, password: string): User | null {
        const user = this.users.find(u => u.username === username && u.password === password);
        return user || null;
    }
    // lấy hết
    getAllUsers(): User[] {
        return this.users;
    }
    // móc user theo id ra để dành kiểm tra
    getUserById(id: string): User | null {
        return this.users.find(u => u.id === id) || null; // sửa từ ?? thành || test
    }

    // dùng partial để cập nhật thông tin user đưa về optional của User rồi muốn thêm gì thêm
    updateUser(id: string, updatedData: Partial<User>): User | null {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) return null;

        const updatedUser = { ...this.users[userIndex], ...updatedData };
        this.users[userIndex] = updatedUser;
        this.saveUsers();
        return updatedUser;
    }

    deleteUser(id: string): boolean {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) return false;

        this.users.splice(userIndex, 1);
        this.saveUsers();
        return true;
    }

    // thêm hàm tìm kiếm user theo tên
    searchUserByName(name: string): User[] {
        return this.users.filter(user => user.username.toLowerCase().includes(name.toLowerCase()));
    }


    // thêm hàm tìm kiếm user theo role
    searchUserByRole(role: UserRole): User[] {
        return this.users.filter(user => user.role === role);
    }
}