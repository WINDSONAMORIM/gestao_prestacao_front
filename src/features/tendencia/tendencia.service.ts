import { ApiResponse } from "@/types/apiResponse";

import { connection } from "@/service/connection";
import { ExcedenteAno, TendenciaPorGrupo } from "./tendencia.types";

export const getTendenciaPorGrupo = async (grupoId: string): Promise<
  ApiResponse<TendenciaPorGrupo[]>> => {
  const response = await connection.get(`/tendencia/${grupoId}`);
  return response.data
}

export const getTendenciaPorSubGrupo = async (grupoId: string, subgrupoId: string): Promise<
  ApiResponse<TendenciaPorGrupo[]>> => {
  const response = await connection.get(`/tendencia/${grupoId}/${subgrupoId}`);
  return response.data
}

export const getVariacaoOrcadoRealizado = async (): Promise<
  ApiResponse<{ variacao: number }>
> => {
  const response = await connection.get("/financeiro/variacao");
  return response.data;
};

export const getExecucaoOrcadoRealizado = async (): Promise<
  ApiResponse<{ execucao: number }>
> => {
  const response = await connection.get("/financeiro/execucao");
  return response.data;
};

export const getTopExcedenteAnual = async (ano: number): Promise<
ApiResponse<ExcedenteAno[]>
> => {
  const response = await connection.get(
    `/financeiro/top-anual-excede-orcado/${ano}`,
  );
  return response.data;
};