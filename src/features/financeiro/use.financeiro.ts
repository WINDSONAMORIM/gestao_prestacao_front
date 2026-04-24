"use client";

import {
  ExcedenteAno,
  ResumoUI,
  TendenciaPorGrupo,
} from "@/features/financeiro/financeiro.types";
import { useQuery } from "@tanstack/react-query";
import {
  fetchExcedenteAno,
  fetchResumoAnualPorGrupo,
  fetchResumoAnualPorSubGrupo,
  fetchResumoMensalPorGrupo,
  fetchResumoMensalPorSubgrupo,
  fetchTendenciaPorGrupo,
} from "./financeiro.providers";
import { useTheme } from "@mui/material";

export const UseFinanceiroResumoAnualPorGrupo = (ano: number) => {
  const theme = useTheme();
  const { data, isLoading } = useQuery<ResumoUI[]>({
    queryKey: ["resumoPorGrupo", ano],
    queryFn: () => fetchResumoAnualPorGrupo(theme, ano),
    enabled: !!ano,
  });
  return {
    data: data ?? [],
    loading: isLoading,
  };
};

export const UseFinanceiroResumoMensalPorGrupo = (ano: number, mes: number) => {
  const theme = useTheme();
  const { data, isLoading } = useQuery<ResumoUI[]>({
    queryKey: ["resumoPorGrupo", ano, mes],
    queryFn: () => fetchResumoMensalPorGrupo(theme, ano, mes),
    enabled: !!ano && !!mes,
  });
  return {
    data: data ?? [],
    loading: isLoading,
  };
};

export const UseFinanceiroResumoAnualPorSubGrupo = (ano: number, groupId: string) => {
  const theme = useTheme();
  const { data, isLoading } = useQuery<ResumoUI[]>({
    queryKey: ["resumoPorSubGrupo", ano, groupId],
    queryFn: () => fetchResumoAnualPorSubGrupo(theme, ano, groupId),
    enabled: !!ano && !!groupId, 
  });
  return {
    data: data ?? [],
    loading: isLoading,
  };
};

export const UseFinanceiroResumoMensalPorSubGrupo = (ano: number, mes: number, groupId: string) => {
  const theme = useTheme();
  const { data, isLoading } = useQuery<ResumoUI[]>({
    queryKey: ["resumoPorSubGrupo", ano, mes, groupId],
    queryFn: () => fetchResumoMensalPorSubgrupo(theme, ano, mes, groupId),
    enabled: !!ano && !!mes && !!groupId, 
  });
  return {
    data: data ?? [],
    loading: isLoading,
  };
};

export const UseFinanceiroTendenciaPorGrupo = (grupoId?: string) => {
  const theme = useTheme();
  const { data, isLoading } = useQuery<TendenciaPorGrupo[]>({
    queryKey: ["tendenciaPorGrupo", grupoId],
    queryFn: () => fetchTendenciaPorGrupo(grupoId!),
    enabled: !!grupoId,
    // placeholderData: (previousData) => previousData ?? [],
  });
  return {
    data: data ?? [],
    // loading: isLoading,
  };
};

export const UseFinanceiroExcendenteAno = (ano: number )=> {
  const {data, isLoading} = useQuery<ExcedenteAno[]>({
    queryKey:["excedenteAno", ano],
    queryFn: () => fetchExcedenteAno(ano),
    enabled: !!ano
  });
  return{
    data: data ?? [],
    loading: isLoading,
  };
}

// export function useFinanceiroVariacao() {
//   const [data, setData] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);

//   async function fetchData() {
//     try {
//       const res = await getVariacaoOrcadoRealizado();
//       setData(res.data);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return { data, loading };
// }
