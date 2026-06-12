import { connection } from "@/service/connection"
import { ProcessoMyflux } from "./myFlux.types";
import { TableResponseApi } from "@/types/apiResponse";

export const getToken = async (username: string, password:string): Promise<any> => {
    const body = {
        username, password
    }
    const response = await connection.post<any>(`/myFlux-login`, body)
    console.log(response.data)
    return response.data;
};

export const previewTable = async (file: File) : Promise<TableResponseApi<ProcessoMyflux>> => {
    const form = new FormData()
    form.append("file", file)
    const response = await connection.post<TableResponseApi<ProcessoMyflux>>(`/downloadProcess-preview`, form,{
        headers:{
            "Content-Type" : "multipart/form-data",
        }
    })
    console.log("preview table",response)
    const {headers, data} = response.data
    return {headers,data}
}

export const downloadProcess = async (processos: ProcessoMyflux[], token: string) : Promise<Blob> => {
    const response = await connection.post(`/downloadProcess`, processos,{
        headers:{
            Authorization: `Bearer ${token}`
        },
        responseType:"blob"
    }
)

    return response.data;
}