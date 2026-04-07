import { ApiResponse } from "@/types/apiResponse";

export interface RealizadoTotal {
  total: number;
}

export type RealizadoTotalResponse = ApiResponse<RealizadoTotal>;