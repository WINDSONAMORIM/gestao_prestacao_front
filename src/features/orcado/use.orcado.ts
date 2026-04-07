"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchOrcadoTotal } from "@/features/orcado/orcado.providers";
import { OrcadoTotal } from "./orcado.types";

const UseOrcadoTotal = () => {
  const { data, isLoading } = useQuery<OrcadoTotal>({
    queryKey: ['orcadoTotal'],
    queryFn: fetchOrcadoTotal,
  });

  return {
    value: data?.total ?? null,
    loading: isLoading,
  };

}

export default UseOrcadoTotal;
