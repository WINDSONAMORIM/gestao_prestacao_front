import { ApiResponse } from "@/types/apiResponse";
import { connection } from "../../service/connection";
import { ResumoPorGrupo, TendenciaPorGrupo } from "@/features/financeiro/financeiro.types";

export const getResumoAnualPorGrupo = async (ano: number): Promise<
  ApiResponse<ResumoPorGrupo[]>
> => {
  const response = await connection.get(`/financeiro/resumo-anual-grupo/${ano}`);
  return response.data;
};

export const getResumoMensalPorGrupo = async (ano: number, mes: number): Promise<
  ApiResponse<ResumoPorGrupo[]>
> => {
  const response = await connection.get(`/financeiro/resumo-mensal-grupo/${ano}/${mes}`);
  return response.data;
};

export const getResumoAnualPorSubGrupo = async (ano: number, grupoId: string): Promise<
  ApiResponse<ResumoPorGrupo[]>
> => {
const response = await connection.get(`/financeiro/resumo-anual-subgrupo/${ano}/${grupoId}`);
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

