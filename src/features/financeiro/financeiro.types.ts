import { ApiResponse } from "@/types/apiResponse";

export interface ResumoPorGrupo {
  id: string;
  descricao: string;
  orcado: number;
  realizado: number;
}

export type ResumoPorGrupoResponse = ApiResponse<ResumoPorGrupo[]>