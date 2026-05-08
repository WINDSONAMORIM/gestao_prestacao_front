import { ApiResponse } from "@/types/apiResponse";
import { connection } from "../../service/connection";
import { ExcedenteAno, ResumoPorGrupo, ResumoPorSubGrupo, TendenciaPorGrupo } from "./financeiro.types";

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
  ApiResponse<ResumoPorSubGrupo[]>
> => {
const response = await connection.get(`/financeiro/resumo-anual-subgrupo/${ano}/${grupoId}`);
  return response.data;
};

export const getResumoMensalPorSubgrupo = async(ano:number, mes:number, id_grupo: string): Promise<
  ApiResponse<ResumoPorSubGrupo[]>
> => {
  const response = await connection.get(`/financeiro/resumo-mensal-subgrupo/${ano}/${mes}/${id_grupo}`);
  return response.data;
}  

export const getResumoAnualPorRubrica = async(ano: number, id_grupo: string, id_subgrupo: string): Promise<
ApiResponse<any[]>
> => {
  const response = await connection.get(`/financeiro/resumo-anual-rubrica/${ano}/${id_grupo}/${id_subgrupo}`);
  console.log("Service Anual Rubrica:", response)
  return response.data;
}

export const getResumoMensalPorRubrica = async(ano: number, mes: number, id_grupo: string, id_subgrupo: string): Promise<
ApiResponse<any[]>
> => {
 console.log(`Params: ${id_subgrupo} - ${mes}`)
 const response = await connection.get(`/financeiro/resumo-mensal-rubrica/${ano}/${mes}/${id_grupo}/${id_subgrupo}`);
 console.log("Service Mensal Rubrica:", response)
  return response.data;
}

// export const getResumoPorSubGrupo = async (grupoId: string): Promise<
//   ApiResponse<ResumoPorGrupo[]>
// > => {
// const response = await connection.get(`/financeiro/resumo-subgrupo/${grupoId}`);
//   return response.data;
// };



