import { ApiResponse } from "@/types/apiResponse";
import { connection } from "../../service/connection";
import { ExcedenteAno, ResumoPorGrupo, TendenciaPorGrupo } from "@/features/financeiro/financeiro.types";

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

