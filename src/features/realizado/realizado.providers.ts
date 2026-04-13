import { getRealizadoTotalMock } from "./realizado.mock";
import { getTotalRealizado } from "./realizado.service";
import { RealizadoTotal } from "./realizado.types";


const USE_MOCK = false;

export const fetchRealizadoTotal = async (): Promise<RealizadoTotal> => {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 500));

    return getRealizadoTotalMock().data;
  }

  const response = await getTotalRealizado();
  return response.data;
};
