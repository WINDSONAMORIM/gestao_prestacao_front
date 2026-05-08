import { useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ExcedenteAno, TendenciaPorGrupo } from "./tendencia.types";
import { fetchExcedenteAno, fetchTendenciaPorGrupo, fetchTendenciaPorSubgrupoGrupo } from "./tendencia.provider";

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

export const UseFinanceiroTendenciaPorSubGrupo = (grupoId?: string, subgrupoId?:string) => {
  const theme = useTheme();
  const { data, isLoading } = useQuery<TendenciaPorGrupo[]>({
    queryKey: ["tendenciaPorGrupo", grupoId, subgrupoId],
    queryFn: () => fetchTendenciaPorSubgrupoGrupo(grupoId!, subgrupoId!),
    enabled: !!grupoId && !!subgrupoId,
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