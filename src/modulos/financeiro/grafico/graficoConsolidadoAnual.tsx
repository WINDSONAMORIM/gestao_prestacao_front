"use client";

import { useTheme } from "@mui/material";
import {
  Bar,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export function GraficoFinanceiroConsolidado({ data }: { data: any[] }) {
  const theme = useTheme();

  const dataComPercentual = data.map((item) => ({
    ...item,
    percentual: item.orcado
      ? (item.realizado / item.orcado) * 100
      : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={dataComPercentual}>
        <XAxis dataKey="descricao" />

        <Tooltip />

        <Bar dataKey="orcado" fill={theme.palette.orcado.main} />
        <Bar dataKey="realizado" fill={theme.palette.realizado.main} />

        <Line
          type="monotone"
          dataKey="percentual"
          stroke={theme.palette.success.main}
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}