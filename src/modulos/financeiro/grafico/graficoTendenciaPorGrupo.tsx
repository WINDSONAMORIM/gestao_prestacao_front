"use client";

import { getTendenciaPorGrupo } from "@/features/tendencia/tendencia.service";
import { useQuery } from "@tanstack/react-query";

import {
  AreaChart,
  Area,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function GraficoTendenciaPorGrupo({grupoId,}: {grupoId: string | null;}) {
  const { data: response } = useQuery({
    queryKey: ["tendencia", grupoId],
    queryFn: () => getTendenciaPorGrupo(grupoId!),
    enabled: !!grupoId,
  });

  const data = response?.data || [];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />

        <Area dataKey="realizado" stroke="#00E676" fill="#00E67633" />
        <Line dataKey="orcado" stroke="#1976d2" />
      </AreaChart>
    </ResponsiveContainer>
  );
}