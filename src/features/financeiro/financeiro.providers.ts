import { getResumoAnualPorGrupo, getResumoAnualPorSubGrupo, getResumoMensalPorGrupo, getResumoMensalPorSubgrupo, getTendenciaPorGrupo, getTopExcedenteAnual,  } from "@/features/financeiro/financeiro.service";
import { getResumoPorGrupoMock, getResumoPorSubgrupoMock, getTendenciaPorGrupoMock } from "./financeiro.mock";
import { ExcedenteAno, ResumoPorGrupo, ResumoUI, TendenciaPorGrupo } from "./financeiro.types";
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

export const fetchResumoMensalPorSubgrupo = async(theme: Theme, ano: number, mes: number, grupoId: string): Promise<ResumoUI[]> => {
    let data: ResumoPorGrupo[]
    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        data = getResumoPorSubgrupoMock().data;
    }else{
        const response = await getResumoMensalPorSubgrupo(ano, mes, grupoId)
        data = response.data
    }
    return data.map((item) => mapResumo(item, theme))
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

export const fetchExcedenteAno = async (ano: number) : Promise<ExcedenteAno[]> =>{
    let data: ExcedenteAno[]
    if (USE_MOCK){
        return [
          {
            id_grupo: "09",
            orcado: 6806641.8,
            realizado: 1177490.19,
            diferenca: -5629151.61,
            perc: 17.3,
          },
          {
            id_grupo: "10",
            orcado: 0,
            realizado: 279.09,
            diferenca: 279.09,
            perc: 0,
          },
        ];
    }else{
        const response = await getTopExcedenteAnual(ano)
        data = response.data ?? []
    }
    return data
}