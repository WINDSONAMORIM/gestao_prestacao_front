import { getResumoAnualPorGrupo, getResumoAnualPorSubGrupo, getResumoMensalPorGrupo, getResumoPorSubGrupo, getTendenciaPorGrupo,  } from "@/features/financeiro/financeiro.service";
import { getResumoPorGrupoMock, getResumoPorSubgrupoMock, getTendenciaPorGrupoMock } from "./financeiro.mock";
import { ResumoPorGrupo, ResumoUI, TendenciaPorGrupo } from "./financeiro.types";
import { Theme } from "@mui/material";
import { mapResumo } from "./financeiro.mapper";

const USE_MOCK = false;

export const fetchResumoAnualPorGrupo = async (theme: Theme, ano: number): Promise<ResumoUI[]> => {
    let data: ResumoPorGrupo[]

    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        data = getResumoPorGrupoMock().data;
    }else{
        const response = await getResumoAnualPorGrupo(ano)
        data = response.data
    }

    return data.map((item)=> mapResumo(item, theme))
}

export const fetchResumoMensalPorGrupo = async (theme: Theme, ano: number, mes: number): Promise<ResumoUI[]> => {
    let data: ResumoPorGrupo[]

    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        data = getResumoPorGrupoMock().data;
    }else{
        const response = await getResumoMensalPorGrupo(ano, mes)
        data = response.data
    }

    return data.map((item)=> mapResumo(item, theme))
}

export const fetchResumoAnualPorSubGrupo = async (theme: Theme, ano: number, groupId: string): Promise<ResumoUI[]> => {
    let data: ResumoPorGrupo[]
    
    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        data = getResumoPorSubgrupoMock().data;
    }else{
        const response = await getResumoAnualPorSubGrupo(ano, groupId)
        data = response.data
    }
    
    return data.map((item)=>mapResumo(item, theme))
}

export const fetchTendenciaPorGrupo = async (grupoId: string): Promise<TendenciaPorGrupo[]> =>{
    let data: TendenciaPorGrupo[]
    
    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        data = getTendenciaPorGrupoMock().data;
    }else{
        const response = await getTendenciaPorGrupo(grupoId)
        data = response.data
    }
    
    return data
}