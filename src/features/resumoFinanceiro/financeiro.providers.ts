import { getResumoAnualPorGrupo, getResumoAnualPorRubrica, getResumoAnualPorSubGrupo, getResumoMensalPorGrupo, getResumoMensalPorRubrica, getResumoMensalPorSubgrupo } from "@/features/resumoFinanceiro/financeiro.service";
import { getResumoAnualPorRubricaMock, getResumoMensalPorRubricaMock, getResumoPorGrupoMock, getResumoPorSubgrupoMock } from "./financeiro.mock";
import { ResumoAnualPorRubrica, ResumoMensalPorRubrica, ResumoPorGrupo, ResumoUI } from "./financeiro.types";
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

export const fetchResumoAnualPorRubrica = async(theme: Theme, ano: number, grupoId: string, subgrupoId: string): Promise<ResumoUI[]> => {
    let data: ResumoPorGrupo[]
    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        data = getResumoAnualPorRubricaMock().data;
    }else{
        const response = await getResumoAnualPorRubrica(ano, grupoId, subgrupoId)
        console.log("Provider Anual Rubrica: ", response)
        data = response.data
    }
    return data.map((item) => mapResumo(item, theme))
}

export const fetchResumoMensalPorRubrica = async(theme: Theme, ano: number, mes: number, grupoId: string, subgrupoId: string): Promise<ResumoUI[]> => {
    let data: ResumoPorGrupo[];
    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        data = getResumoMensalPorRubricaMock().data;
    }else{
        const response = await getResumoMensalPorRubrica(ano, mes, grupoId, subgrupoId)
        console.log(`Params: ${subgrupoId}`)
        console.log("Provider Mensal Rubrica: ", response)
        data = response.data
    }
    return data.map((item) => mapResumo(item, theme))
}