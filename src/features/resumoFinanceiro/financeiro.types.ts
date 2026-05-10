import { ApiResponse } from "@/types/apiResponse";

export interface ResumoPorGrupo {
  id_grupo: string;
  descricao: string;
  orcado: number;
  realizado: number;
}

export interface ResumoAnualPorRubrica {
  ano: number;
  id_grupo: string;
  id_subgrupo: string;
}

export interface ResumoMensalPorRubrica {
  ano: number;
  mes: number;
  id_grupo: string;
  id_subgrupo: string;
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

export type ResumoPorGrupoResponse = ApiResponse<ResumoPorGrupo[]>;
export type ResumoAnualPorRubricaResponse = ApiResponse<ResumoAnualPorRubrica[]>;
export type ResumoMensalPorRubricaResponse = ApiResponse<ResumoMensalPorRubrica[]>;
