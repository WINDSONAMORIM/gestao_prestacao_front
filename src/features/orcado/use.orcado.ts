"use client";
import { useQuery } from "@tanstack/react-query";
import { featchOrcadoMensal, fetchOrcadoTotal } from "@/features/orcado/orcado.providers";
import { OrcadoTotal } from "./orcado.types";

export const UseOrcadoTotal = (ano: number) => {
  const { data, isLoading } = useQuery<OrcadoTotal>({
    queryKey: ['orcadoTotal', ano],
    queryFn: () => fetchOrcadoTotal(ano),
    enabled: !!ano
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
  const orcadoTotal = UseOrcadoTotal(ano);

  return {
    value: isMensal ? orcadoMensal.value : orcadoTotal.value,
    loading: isMensal ? orcadoMensal.loading : orcadoTotal.loading,
  };
};