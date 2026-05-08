import { getTendenciaPorGrupoMock } from "../resumoFinanceiro/financeiro.mock";

import { getTendenciaPorGrupo, getTendenciaPorSubGrupo, getTopExcedenteAnual } from "./tendencia.service";
import { ExcedenteAno, TendenciaPorGrupo } from "./tendencia.types";

const USE_MOCK = false;

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

export const fetchTendenciaPorSubgrupoGrupo = async (grupoId: string, subgrupoId: string): Promise<TendenciaPorGrupo[]> =>{
    let data: TendenciaPorGrupo[]
    
    if (USE_MOCK){
        await new Promise((r) => setTimeout(r, 500));
        data = getTendenciaPorGrupoMock().data;
    }else{
        const response = await getTendenciaPorSubGrupo(grupoId, subgrupoId)
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