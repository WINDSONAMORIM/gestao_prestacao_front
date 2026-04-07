import { connection } from "../../service/connection";
import { OrcadoTotalResponse } from "./orcado.types";

export const getTotalOrcado = async (): Promise<OrcadoTotalResponse> => {
  const response = await connection.get<OrcadoTotalResponse>("/orcado");
  return response.data;
};
