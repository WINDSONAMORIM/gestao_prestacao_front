"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchRealizadoTotal } from "./realizado.providers";
import { RealizadoTotal } from "./realizado.types";


const UseRealizadoTotal = () => {
  const { data, isLoading } = useQuery<RealizadoTotal>({
    queryKey: ['realizadoTotal'],
    queryFn: fetchRealizadoTotal,
  });
  
  return {
    value: data?.total ?? null,
    loading: isLoading,
  };
};

export default UseRealizadoTotal;
