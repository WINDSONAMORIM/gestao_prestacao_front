// features/financeiro/hooks/useFinanceiro.ts
import { useEffect, useState } from "react";
import {
  ApiResponse,
  getResumoPorGrupo,
  getVariacaoOrcadoRealizado,
  ResumoPorGrupo,
} from "../../app/dashboard/components/financeiroService";

export function useFinanceiro() {
  const [data, setData] = useState<ApiResponse<ResumoPorGrupo[]>>(
    {} as ApiResponse<ResumoPorGrupo[]>,
  );
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await getResumoPorGrupo();
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
}

export function useFinanceiroVariacao() {
  const [data, setData] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await getVariacaoOrcadoRealizado();
      setData(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
}
