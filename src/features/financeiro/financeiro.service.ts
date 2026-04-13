import { ApiResponse } from "@/types/apiResponse";
import { connection } from "../../service/connection";
import { ResumoPorGrupo, TendenciaPorGrupo } from "@/features/financeiro/financeiro.types";

export const getResumoPorGrupo = async (): Promise<
  ApiResponse<ResumoPorGrupo[]>
> => {
  const response = await connection.get("/financeiro/resumo-grupo");
  return response.data;
};

export const getResumoPorSubGrupo = async (grupoId: string): Promise<
  ApiResponse<ResumoPorGrupo[]>
> => {
const response = await connection.get(`/financeiro/resumo-subgrupo/${grupoId}`);
  return response.data;
};

export const getTendenciaPorGrupo = async (grupoId: string): Promise<
  ApiResponse<TendenciaPorGrupo[]>> => {
  const response = await connection.get(`/financeiro/tendencia-mensal/${grupoId}`);
  console.log("Tendencia por grupo:", response.data);
  return response.data
}

export const getVariacaoOrcadoRealizado = async (): Promise<
  ApiResponse<{ variacao: number }>
> => {
  const response = await connection.get("/financeiro/variacao");
  console.log("Variacao Orcado x Realizado:", response.data.data);
  return response.data;
};

export const getExecucaoOrcadoRealizado = async (): Promise<
  ApiResponse<{ execucao: number }>
> => {
  const response = await connection.get("/financeiro/execucao");
  console.log("Execucao Orçado x Realizado:", response.data);
  return response.data;
};

