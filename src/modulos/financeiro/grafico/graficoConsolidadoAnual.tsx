"use client";

import { useTheme } from "@mui/material";
import { ResumoPorGrupo } from "@/features/financeiro/financeiro.types";
import { Bar, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { UseFinanceiroResumoAnualPorGrupo, UseFinanceiroResumoMensalPorGrupo } from "@/features/financeiro/use.financeiro";
import { TooltipConsolidadoAnual } from "../tooltip/tooltipConsolidadoAnual";

export function GraficoFinanceiroConsolidado({ selecionado,ano, mes, modo }: { selecionado: ResumoPorGrupo | null, ano: number, mes: number, modo: string }) {
  const theme = useTheme();

  const isModo = modo;
  const {data}:{data:ResumoPorGrupo[]} = isModo === "consolidado" ? UseFinanceiroResumoAnualPorGrupo(ano) : UseFinanceiroResumoMensalPorGrupo(ano, mes);
  // const { data }: { data: ResumoPorGrupo[] } = UseFinanceiroResumoAnualPorGrupo(ano);
  // const {data}:{dataMensal:ResumoPorGrupo[]} = UseFinanceiroResumoMensalPorGrupo(ano, mes)

  const dataFiltrada = selecionado
    ? data.filter((item) => item.id_grupo === selecionado.id_grupo)
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
          dataKey={(data)=> data.id_grupo}
          stroke={theme.palette.text.primary}
          angle={-45}
          textAnchor="end"
          interval={0}
        />

        <Tooltip content={<TooltipConsolidadoAnual />} />
        <Bar dataKey="orcado" fill={theme.palette.orcado.main} name="orçado" />
        <Bar
          dataKey={(data)=> data.realizado}
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