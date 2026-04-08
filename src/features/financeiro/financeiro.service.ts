import { ApiResponse } from "@/types/apiResponse";
import { connection } from "../../service/connection";
import { ResumoPorGrupo } from "@/features/financeiro/financeiro.types";



export const getResumoPorGrupo = async (): Promise<
  ApiResponse<ResumoPorGrupo[]>
> => {
  const response = await connection.get("/financeiro");
  console.log("Resumo por grupo:", response.data);
  return response.data;
};  

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
