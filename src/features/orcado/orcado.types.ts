import { ApiResponse } from "@/types/apiResponse";

export interface OrcadoTotal {
  total: number;
}

export type OrcadoTotalResponse = ApiResponse<OrcadoTotal>;