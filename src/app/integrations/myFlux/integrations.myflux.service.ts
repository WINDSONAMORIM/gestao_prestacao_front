import { connection } from "@/service/connection"

export const getToken = async (username: string, password:string): Promise<any> => {
    const body = {
        username, password
    }
    const response = await connection.post<any>(`/myFlux-login`, body)
    console.log(response.data)
    return response.data;
};

export const previewTable = async (file: File) : Promise<any> => {
    const form = new FormData()
    form.append("file", file)
    const reponse = await connection.post<any>(`/downloadProcess-preview`, form,{
        headers:{
            "Content-Type" : "multipart/form-data",
        }
    })
    return reponse.data
}