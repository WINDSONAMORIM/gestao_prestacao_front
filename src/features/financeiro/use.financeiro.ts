"use client"

import { ResumoUI, TendenciaPorGrupo } from "@/features/financeiro/financeiro.types";
import { useQuery } from "@tanstack/react-query";
import { fetchResumoPorGrupo, fetchResumoPorSubGrupo, fetchTendenciaPorGrupo } from "./financeiro.providers";
import { useTheme } from "@mui/material";

export const UseFinanceiro = () => {
  const theme = useTheme()
  const {data, isLoading} = useQuery<ResumoUI[]>({
    queryKey:['resumoPorGrupo'],
    queryFn: () => fetchResumoPorGrupo(theme)
  })
  return{
    data: data ?? [],
    loading:isLoading
  }
}

export const UseFinanceiroSubGrupo = () => {
  const theme = useTheme()
  const {data, isLoading} = useQuery<ResumoUI[]>({
    queryKey:['resumoPorSubGrupo'],
    queryFn:() => fetchResumoPorSubGrupo(theme)
  })
  return{
    data: data ?? [],
    loading:isLoading
  }
}

export const UseFinanceiroTendenciaPorGrupo = () =>{
  const theme = useTheme()
  const {data, isLoading} = useQuery<TendenciaPorGrupo[]>({
    queryKey:['tendenciaPorGrupo'],
    queryFn: () => fetchTendenciaPorGrupo()
  })
  return{
    data: data ?? [],
    loading: isLoading
  }
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
