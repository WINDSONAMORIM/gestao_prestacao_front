import { connection } from "@/service/connection";
import { ProcessoMyflux } from "./myFlux.types";
import {
  ApiResponse,
  AxiosErrorResponse,
  TableResponseApi,
} from "@/types/apiResponse";
import axios from "axios";

interface loginNyflux {
  username: string;
  password: string;
}

interface tokenResponse {
  token: string;
  statusCode: number;
  data: {
    token: string;
  };
}

export const getToken = async ({
  username,
  password,
}: loginNyflux): Promise<ApiResponse<tokenResponse>> => {
  const body = { username, password };
  console.log("body", body);
  try {
    const response = await connection.post(`/myFlux-login`, body);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<AxiosErrorResponse>(error)) {
      console.error("Error Axios token:", error.response?.data?.message);
      error.response?.data.data.forEach((err) => {
        console.log(err.message);
      });
      throw error.response?.data;
    }
    throw error;
  }
};

export const previewTable = async (
  file: File,
): Promise<TableResponseApi<ProcessoMyflux>> => {
  const form = new FormData();
  form.append("file", file);
  const response = await connection.post<TableResponseApi<ProcessoMyflux>>(
    `/downloadProcess-preview`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  console.log("preview table", response);
  const { headers, data } = response.data;
  return { headers, data };
};

export const downloadProcess = async (
  processos: ProcessoMyflux,
  token: string,
): Promise<Blob> => {
  try {
    const response = await connection.post(`/downloadProcess`, processos, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    });

    console.log(response)

    return response.data;
  } catch (err) {
    console.error(err);

    if (axios.isAxiosError(err)) {
      console.log("message", err.message);
      console.log("code", err.code);
      console.log("status", err.response?.status);
      console.log("data", err.response?.data);
    }

    throw err;
  }
};
