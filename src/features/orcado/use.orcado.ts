"use client";
import { useQuery } from "@tanstack/react-query";
import { featchOrcadoMensal, fetchOrcadoTotal } from "@/features/orcado/orcado.providers";
import { OrcadoTotal } from "./orcado.types";

export const UseOrcadoTotal = () => {
  const { data, isLoading } = useQuery<OrcadoTotal>({
    queryKey: ['orcadoTotal'],
    queryFn: fetchOrcadoTotal,
  });

  return {
    value: data?.total ?? null,
    loading: isLoading,
  };
}

export const UseOrcadoMensal = (ano: number, mes: number) => {
  const { data, isLoading } = useQuery<OrcadoTotal>({
    queryKey: ["orcadoTotal", ano, mes],
    queryFn: () => featchOrcadoMensal(ano, mes),
    enabled: !!ano && !!mes,
  });

  return {
    value: data?.total ?? null,
    loading: isLoading,
  };
};

export const useOrcadoModo = (modo: string, ano: number, mes: number) => {
  const isMensal = modo === "mensal";

  const orcadoMensal = UseOrcadoMensal(ano, mes);
  const orcadoTotal = UseOrcadoTotal();

  return {
    value: isMensal ? orcadoMensal.value : orcadoTotal.value,
    loading: isMensal ? orcadoMensal.loading : orcadoTotal.loading,
  };
};