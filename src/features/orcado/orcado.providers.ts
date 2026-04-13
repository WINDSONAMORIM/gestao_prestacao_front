import { getTotalOrcadoMock } from "@/features/orcado/orcado.mock";
import { getTotalOrcado } from "@/features/orcado/orcado.service";
import { OrcadoTotal } from "./orcado.types";

const USE_MOCK = false;

export const fetchOrcadoTotal = async (): Promise<OrcadoTotal> => {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 500));

    return getTotalOrcadoMock().data;
  }
  const response = await getTotalOrcado();
  
  return response.data;
};
