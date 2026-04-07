import { connection } from "../../service/connection";
import { RealizadoTotalResponse } from "./realizado.types";

export const getTotalRealizado = async (): Promise<RealizadoTotalResponse> => {
  const response = await connection.get<RealizadoTotalResponse>("/realizado");
  return response.data;
};
