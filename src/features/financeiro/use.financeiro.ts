"use client"

import { ResumoPorGrupo } from "@/features/financeiro/financeiro.types";
import { useQuery } from "@tanstack/react-query";
import { fetchResumoPorGrupo, fetchResumoPorSubGrupo } from "./financeiro.providers";

export const UseFinanceiro = () =>{
  const {data, isLoading} = useQuery<ResumoPorGrupo[]>({
    queryKey:['resumoPorGrupo'],
    queryFn:fetchResumoPorGrupo
  })
  return{
    data: data ?? [],
    loading:isLoading
  }
}

export const UseFinanceiroSubGrupo = () =>{
  const {data, isLoading} = useQuery<ResumoPorGrupo[]>({
    queryKey:['resumoPorSubGrupo'],
    queryFn:fetchResumoPorSubGrupo
  })
  return{
    data: data ?? [],
    loading:isLoading
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
