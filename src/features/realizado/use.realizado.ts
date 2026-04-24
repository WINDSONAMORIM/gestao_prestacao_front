"use client";
import { useQuery } from "@tanstack/react-query";
import {
  featchRealizadoMensal,
  fetchRealizadoTotal,
} from "./realizado.providers";
import { RealizadoTotal } from "./realizado.types";

export const UseRealizadoTotal = (ano: number) => {
  const { data, isLoading } = useQuery<RealizadoTotal>({
    queryKey: ["realizadoTotal", ano],
    queryFn: () => fetchRealizadoTotal(ano),
    enabled: !!ano
  });

  return {
    value: data?.total ?? null,
    loading: isLoading,
  };
};

export const UseRealizadoMensal = (ano: number, mes: number) => {
  const { data, isLoading } = useQuery<RealizadoTotal>({
    queryKey: ["realizadoTotal", ano, mes],
    queryFn: () => featchRealizadoMensal(ano, mes),
    enabled: !!ano && !!mes,
  });

  return {
    value: data?.total ?? null,
    loading: isLoading,
  };
};

export const useRealizadoModo = (modo: string, ano: number, mes: number) => {
  const isMensal = modo === "mensal";

  const realizadoMensal = UseRealizadoMensal(ano, mes);
  const realizadoTotal = UseRealizadoTotal(ano);

  return {
    value: isMensal ? realizadoMensal.value : realizadoTotal.value,
    loading: isMensal ? realizadoMensal.loading : realizadoTotal.loading,
  };
};
