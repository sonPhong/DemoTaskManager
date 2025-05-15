import { User, UserRole } from '../models/User';
import { loadData, saveData } from '../utils/storage';
import { debouncedSave } from '../utils/debouncedSave'; // dùng hỗ trợ load file sau 1 time ko liên tục
import { generateId } from "../utils/generateID";

// gọi thư viện dùng tạo id 
// import { v4 as uuidv4 } from 'uuid';

const USERS_FILE = './data/users.json';

export class AuthManager {
    private users: User[];

    // dùng debounce để giảm tần suất ghi file
    private saveUsers() {
        debouncedSave(USERS_FILE, this.users);
    }

    constructor() {
        this.users = loadData<User>(USERS_FILE);
    }

    register(username: string, password: string, email: string, role: UserRole): User | null {
        const exists = this.users.find(u => u.username === username);
        if (exists) return null;

        const newUser: User = {
            id: generateId(), // dùng hàm generateId() để tạo id
            username,
            email,
            password,
            role
        };

        this.users.push(newUser);
        this.saveUsers();

        return newUser;
    }

    login(username: string, password: string): User | null {
        return this.users.find(u => u.username === username && u.password === password) ?? null;
    }

    getAllUsers(): User[] {
        return this.users;
    }
}
