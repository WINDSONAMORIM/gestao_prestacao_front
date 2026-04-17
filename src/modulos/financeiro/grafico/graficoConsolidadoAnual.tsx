"use client";

import { useTheme } from "@mui/material";
import { ResumoPorGrupo } from "@/features/financeiro/financeiro.types";
import { Bar, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { UseFinanceiroResumoAnualPorGrupo } from "@/features/financeiro/use.financeiro";
import { TooltipConsolidadoAnual } from "../tooltip/tooltipConsolidadoAnual";

export function GraficoFinanceiroConsolidado({ selecionado,ano }: { selecionado: ResumoPorGrupo | null, ano: number }) {
  const theme = useTheme();
  const { data }: { data: ResumoPorGrupo[] } = UseFinanceiroResumoAnualPorGrupo(ano);

  const dataFiltrada = selecionado
    ? data.filter((item) => item.id === selecionado.id)
    : data;

  const dataComPercentual = dataFiltrada.map((item) => ({
    ...item,
    percentual: item.orcado
      ? (item.realizado / item.orcado) * 100
      : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={dataComPercentual}>

        <XAxis
          dataKey="id"
          stroke={theme.palette.text.primary}
          angle={-45}
          textAnchor="end"
          interval={0}
        />

        <Tooltip content={<TooltipConsolidadoAnual />} />
        <Bar dataKey="orcado" fill={theme.palette.orcado.main} name="orçado" />
        <Bar
          dataKey="realizado"
          fill={theme.palette.realizado.main}
          name="realizado"
        />
   
        <Line
          yAxisId="right"
          orientation="right"
          type="monotone"
          dataKey="percentual"
          stroke={theme.palette.success.main}
          name="% Execução"
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}