import type{ Task } from "../types/task";
const base_url = "http://localhost:3001/todos"


export const todoApi = {
// getall
    getAll: async(): Promise<Task[]> => {
        const response = await fetch(base_url)
        if(!response.ok) throw new Error("faild")
        return response.json()
    // .ok -> kiểm tra status code là 200-299
    },

    // Omit<Task, "id"> -> kiểu dữ liệu task -> nhưng k cần id - vì id tự sinh nên kh truyền
    // vì async -> luôn trả về 1 promises dù không return -> kiểu dlieu trả về luôn ph là promiese
    add: async(task: Omit<Task, "id">): Promise<Task> => {
        const response = await fetch(base_url,{
            method:"POST",
            headers:{"Content_Type":"application/json"},
            body:JSON.stringify(task) // đưa dữ liệu task về dạng chuỗi
            }
        )
        return response.json()
    },

    delete: async(id: number | string): Promise<void> => {
        await fetch(`${base_url}/${id}`,{
            method:"DELETE",
        })
    },

    // Partial<T> -> cho phép các property của T có thể có hoặc không
    // -> ta sẽ không cần gửi toàn bộ obj chỉ cần gửi trg muốn sửa
    update: async(id: number | string,updateData: Partial<Task>): Promise<Task> => {
        const response =await fetch(`${base_url}/${id}`,{
            method:"PATCH", // dùng khi ta cập nhật -> lấy dlieu từ db sau đó cập nhật các trường ta gửi lên -> return về obj đã updated
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(updateData)
        })
        return response.json()
    }
}