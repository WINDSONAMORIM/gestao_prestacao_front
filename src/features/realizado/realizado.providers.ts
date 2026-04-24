import { getRealizadoTotalMock } from "./realizado.mock";
import { getRealizadoMensal, getTotalRealizado } from "./realizado.service";
import { RealizadoTotal } from "./realizado.types";


const USE_MOCK = false;

export const fetchRealizadoTotal = async (ano: number): Promise<RealizadoTotal> => {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 500));

    return getRealizadoTotalMock().data;
  }

  const response = await getTotalRealizado(ano);
  return response.data;
};

export const featchRealizadoMensal = async(ano:number, mes:number) : Promise<RealizadoTotal> => {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 500));

    return getRealizadoTotalMock().data;
  }
  const response = await getRealizadoMensal(ano, mes);
  return response.data;
}
