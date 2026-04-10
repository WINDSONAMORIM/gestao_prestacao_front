import { getResumoPorGrupo } from "@/features/financeiro/financeiro.service";
import { getResumoPorGrupoMock, getResumoPorSubgrupoMock, getTendenciaPorGrupo } from "./financeiro.mock";
import { ResumoPorGrupo, ResumoUI, TendenciaPorGrupo, TendenciaPorGrupoResponse } from "./financeiro.types";
import { Theme } from "@mui/material";
import { mapResumo } from "./financeiro.mapper";

const USE_MOCK = true;

export const fetchResumoPorGrupo = async (theme: Theme): Promise<ResumoUI[]> => {
    let data: ResumoPorGrupo[]

    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        data = getResumoPorGrupoMock().data;
    }else{
        const response = await getResumoPorGrupo()
        data = response.data
    }

    return data.map((item)=> mapResumo(item, theme))
}

export const fetchResumoPorSubGrupo = async (theme: Theme): Promise<ResumoUI[]> => {
    let data: ResumoPorGrupo[]
    
    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        data = getResumoPorSubgrupoMock().data;
    }else{
        const response = await getResumoPorGrupo()
        data = response.data
    }
    
    return data.map((item)=>mapResumo(item, theme))
}

export const fetchTendenciaPorGrupo = async (): Promise<TendenciaPorGrupo[]> =>{
    let data: TendenciaPorGrupo[]
    
    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        data = getTendenciaPorGrupo().data;
    }else{
        const response = await getTendenciaPorGrupo()
        data = response.data
    }
    
    return data
}