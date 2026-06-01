import { connection } from "@/service/connection"

export const getToken = async (username: string, password:string): Promise<any> => {
    const body = {
        username, password
    }
    const response = await connection.post<any>(`/myFlux-login`, body)
    console.log(response.data)
    return response.data;
};