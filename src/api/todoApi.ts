// src/api/todoApi.ts
import type{ Task } from "../types/task";

const BASE_URL = "http://localhost:3001/todos";

export const todoApi = {
    // 1. Lấy danh sách
    getAll: async (): Promise<Task[]> => {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch todos");
        return response.json();
    },

    // 2. Thêm mới
    add: async (task: Omit<Task, 'id'>): Promise<Task> => { 
        // Omit 'id' vì id sẽ do server (json-server) tự sinh ra
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        return response.json();
    },

    // 3. Xóa
    delete: async (id: number | string): Promise<void> => {
        await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
    },

    // 4. Cập nhật trạng thái (Toggle Complete)
    update: async (id: number | string, updatedData: Partial<Task>): Promise<Task> => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH", // Dùng PATCH để chỉ sửa 1 phần dữ liệu
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });
        return response.json();
    }
};