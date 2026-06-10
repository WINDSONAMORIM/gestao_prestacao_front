import { connection } from "@/service/connection"
import { ProcessoMyflux } from "./myFlux.types";

export const getToken = async (username: string, password:string): Promise<any> => {
    const body = {
        username, password
    }
    const response = await connection.post<any>(`/myFlux-login`, body)
    console.log(response.data)
    return response.data;
};

export const previewTable = async (file: File) : Promise<ProcessoMyflux> => {
    const form = new FormData()
    form.append("file", file)
    const response = await connection.post<ProcessoMyflux>(`/downloadProcess-preview`, form,{
        headers:{
            "Content-Type" : "multipart/form-data",
        }
    })
    console.log("preview table",response)
    const data = response.data
    return data
}

export const downloadProcess = async (processos: ProcessoMyflux[]) : Promise<any> => {
    const body = {

    }
    const response = await connection.post<any>(`/downloadProcess`, body)

    return response;
}