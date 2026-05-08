import { ApiResponse } from "@/types/apiResponse";

export interface ResumoPorGrupo {
  id_grupo: string;
  descricao: string;
  orcado: number;
  realizado: number;
}

export interface ResumoUI extends ResumoPorGrupo{
  id_subgrupo?: string;
  id_rubrica?: string;
  variacao: number;
  ui: FinanceiroUI;
}

export interface FinanceiroUI{
  color?: string;
  icon?: string;
}

export interface ResumoPorSubGrupo extends ResumoPorGrupo {
  id_subgrupo: string;
}

export type ResumoPorGrupoResponse = ApiResponse<ResumoPorGrupo[]>
