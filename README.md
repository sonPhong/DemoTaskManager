# DemoTask
# 📝 Task Manager CLI (TypeScript)

Một ứng dụng quản lý task đơn giản chạy trên console CLI

---

## 🚀 Tính năng chính

### 👥 Quản lý người dùng
- Đăng ký người dùng mới với vai trò (`admin` hoặc `user`)
- Cập nhật thông tin người dùng (email, mật khẩu, vai trò)
- Xoá người dùng
- Tìm kiếm người dùng theo tên hoặc vai trò
- Xem danh sách tất cả người dùng

### ✅ Quản lý task
- Tạo task mới (chỉ `admin` được phép tạo)
- Giao task cho nhiều người dùng (`user`)
- Cập nhật trạng thái task: `pending`, `in_progress`, `done`
- Xoá task
- Xem tất cả task hiện có

---


---

## 📦 Cài đặt và chạy

```bash
# 1. Clone dự án
git clone https://github.com/sonPhong/DemoTaskManager.git
cd task-manager-cli

# 2. Cài đặt thư viện
npm install

# 3. Chạy ứng dụng
npx ts-node src/cli/mainMenu.ts

Công nghệ sử dụng

TypeScript
Inquirer – CLI prompt
uuid (tuỳ chọn nếu thay generateID) <==> chả dùng mới đầu dùng test 
fs – Lưu trữ đơn giản bằng file JSON (có thể mở rộng thành cơ sở dữ liệu sau)