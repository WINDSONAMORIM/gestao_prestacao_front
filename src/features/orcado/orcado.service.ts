import { connection } from "../../service/connection";
import { OrcadoTotalResponse } from "./orcado.types";

export const getTotalOrcado = async (ano: number): Promise<OrcadoTotalResponse> => {
  const response = await connection.get<OrcadoTotalResponse>(`/orcado-anual/${ano}`);
  return response.data;
};

export const getOrcadoMensal = async (
  ano: number,
  mes: number,
): Promise<OrcadoTotalResponse> => {
  const response = await connection.get<OrcadoTotalResponse>(
    `/orcado-mensal/${ano}/${mes}`,
  );
  return response.data;
};
