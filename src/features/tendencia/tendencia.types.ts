import { ApiResponse } from "@/types/apiResponse";

export interface TendenciaPorGrupo{
  grupo:string;
  mes: number;
  orcado: number;
  realizado: number;
}

export interface ExcedenteAno{
  id_grupo: string;
  orcado: number;
  realizado: number;
  diferenca: number;
  perc: number;
}

export type TendenciaPorGrupoResponse = ApiResponse<TendenciaPorGrupo[]>
export type ExcedenteAnoResponse = ApiResponse<ExcedenteAno[]>