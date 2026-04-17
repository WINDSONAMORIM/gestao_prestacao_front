"use client";

import { useTheme } from "@mui/material";

import { UseFinanceiroResumoAnualPorGrupo, UseFinanceiroTendenciaPorGrupo } from "../../features/financeiro/use.financeiro";
import { ResumoPorGrupo, TendenciaPorGrupo } from "@/features/financeiro/financeiro.types";
import { meses } from "@/features/financeiro/financeiro.mapper";
import { GraficoFinanceiroConsolidado } from "./grafico/graficoConsolidadoAnual";
import { GraficoTendenciaPorGrupo } from "./grafico/graficoTendenciaPorGrupo";

export function GraficoFinanceiro({ selecionado,ano }: { selecionado: ResumoPorGrupo | null, ano: number }) {
  const theme = useTheme();
  const { data }: { data: ResumoPorGrupo[] } = UseFinanceiroResumoAnualPorGrupo(ano);
  const tendencia: TendenciaPorGrupo[] = UseFinanceiroTendenciaPorGrupo(selecionado?.id ?? "").data;

  const dataGrafico = meses.map((mes, index) => {
    const registro = tendencia.find(t => Number(t.mes) === index + 1);
    return {
      mes: mes.label,
      ordem: mes.value,
      realizado: registro?.realizado || 0,
      orcado: registro?.orcado || 0,
    };
  });

  const dataFiltrada = selecionado
    ? data.filter((item) => item.id === selecionado.id)
    : data;

  const dataComPercentual = dataFiltrada.map((item) => ({
    ...item,
    percentual: item.orcado
      ? (item.realizado / item.orcado) * 100
      : 0,
  }));

  if (selecionado) {
    
    return (
      <GraficoTendenciaPorGrupo dataGrafico={dataGrafico} />
    );
  }
  return (
    <GraficoFinanceiroConsolidado selecionado={selecionado} ano={ano} />
  );
}