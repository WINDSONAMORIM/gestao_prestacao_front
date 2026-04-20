import { ApiResponse } from "@/types/apiResponse";

export interface ResumoPorGrupo {
  id: string;
  descricao: string;
  orcado: number;
  realizado: number;
}

export interface TendenciaPorGrupo{
  grupo:string;
  mes: number;
  orcado: number;
  realizado: number;
}

export interface FinanceiroUI{
  color?: string;
  icon?: string;
}

export interface ResumoUI extends ResumoPorGrupo{
  variacao: number;
  ui: FinanceiroUI;
}

export interface ExcedenteAno{
  id_grupo: string;
  orcado: number;
  realizado: number;
  diferenca: number;
  perc: number;
}

export type ResumoPorGrupoResponse = ApiResponse<ResumoPorGrupo[]>
export type TendenciaPorGrupoResponse = ApiResponse<TendenciaPorGrupo[]>
export type ExcedenteAnoResponse = ApiResponse<ExcedenteAno[]>