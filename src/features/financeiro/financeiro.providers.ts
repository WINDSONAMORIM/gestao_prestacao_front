import { getResumoPorGrupo } from "@/features/financeiro/financeiro.service";
import { getResumoPorGrupoMock, getResumoPorSubgrupoMock } from "./financeiro.mock";
import { ResumoPorGrupo } from "./financeiro.types";

const USE_MOCK = true;

export const fetchResumoPorGrupo = async (): Promise<ResumoPorGrupo[]> => {
    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        return getResumoPorGrupoMock().data;
    }
    const response = await getResumoPorGrupo()

    return response.data
}

export const fetchResumoPorSubGrupo = async (): Promise<ResumoPorGrupo[]> => {
    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        return getResumoPorSubgrupoMock().data;
    }
    const response = await getResumoPorGrupo()

    return response.data
}