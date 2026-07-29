import { connection } from "@/service/connection";
import { ApiResponse, AxiosErrorResponse } from "@/types/apiResponse";
import axios from "axios";

interface loginSicap {
  Login: string;
  Senha: string;
  ParceriaId: number;
}

interface TokenResponse {
  Token: string;
}

export const getToken = async ({
  Login,
  Senha,
  ParceriaId,
}: loginSicap): Promise<ApiResponse<TokenResponse>> => {
  const body = { Login, Senha, ParceriaId };
  try {
    const response = await connection.post(`/sicap-login`, body);
    return response.data;
  } catch (error){
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
