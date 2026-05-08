import { useQuery } from "@tanstack/react-query";
import {
  getResumoAnualPorGrupo,
  getResumoMensalPorGrupo,
  getResumoAnualPorSubGrupo,
  getResumoMensalPorSubgrupo,
  getResumoAnualPorRubrica,
  getResumoMensalPorRubrica,
} from "./financeiro.service";
import {  mapResumo } from "./financeiro.mapper";
import { useTheme } from "@mui/material";

type Nivel = "grupo" | "subgrupo" | "rubrica";

interface Params {
  nivel: Nivel;
  modo: "mensal" | "consolidado";
  ano: number;
  mes?: number;
  grupoId?: string | null;
  subgrupoId?: string | null;
}


export const useFinanceiroResumo = ({
    nivel,
    modo,
    ano,
    mes,
    grupoId,
    subgrupoId,
}: Params) => {

  const theme = useTheme()
  
  return useQuery({
    queryKey: ["financeiro", nivel, modo, ano, mes, grupoId, subgrupoId],

    queryFn: async () => {
  let result = [];

  if (nivel === "grupo") {
    result = modo === "mensal"
      ? (await getResumoMensalPorGrupo(ano, mes!)).data
      : (await getResumoAnualPorGrupo(ano)).data;
  }

  if (nivel === "subgrupo") {
    if (!grupoId) return [];
    result = modo === "mensal"
      ? (await getResumoMensalPorSubgrupo(ano, mes!, grupoId)).data
      : (await getResumoAnualPorSubGrupo(ano, grupoId)).data;
  }

  if (nivel === "rubrica") {
    if (!grupoId || !subgrupoId) return [];
    result = modo === "mensal"
      ? (await getResumoMensalPorRubrica(ano, mes!, grupoId, subgrupoId)).data
      : (await getResumoAnualPorRubrica(ano, grupoId, subgrupoId)).data;
  }

  return result.map(item => mapResumo(item, theme));
},
    enabled:
      !!ano &&
      (nivel === "grupo" ||
        (nivel === "subgrupo" && !!grupoId) ||
        (nivel === "rubrica" && !!grupoId && !!subgrupoId)),
  });
};