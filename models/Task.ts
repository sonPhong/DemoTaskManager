export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export interface Task {
    id: string;
    title: string;
    description?: string;
    // assignedTo: string; 
    // createdBy: string;  

    // thay đổi để thích hợp mở rộng, thay thế ý tưởng dùng oinon và type guard
    assignedTo: string[];
    createdBy: string[];
    createdAt: string;
    status: TaskStatus;
}