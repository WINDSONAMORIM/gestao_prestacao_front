"use client";

import { useEffect, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useDrillStore } from "@/store/drillStore";
import { useFinanceiroResumo } from "@/features/resumoFinanceiro/useQuery";
import { GraficoFinanceiroConsolidado } from "./grafico/graficoConsolidadoAnual";
import { GraficoTendenciaPorGrupo } from "./grafico/graficoTendenciaPorGrupo";


type TipoGrafico = "consolidado" | "tendencia";

export function GraficoFinanceiro({
  modo,
  ano,
  mes,
}: {
  modo: "mensal" | "consolidado";
  ano: number;
  mes: number;
}) {
  const [tipo, setTipo] = useState<TipoGrafico>("consolidado");

  const { level, grupoId } = useDrillStore();

  const { data = [] } = useFinanceiroResumo({
    nivel: level,
    modo,
    ano,
    mes,
    grupoId,
  });

  const handleChange = (_: any, value: TipoGrafico) => {
    if (value) setTipo(value);
    console.log(`change: ${value}`)
  };

  useEffect(() => {
  if (!grupoId && tipo === "tendencia") {
    setTipo("consolidado");
  }
}, [grupoId, tipo]);

  return (
    <Box>
      <Tabs
        value={tipo}
        // exclusive
        onChange={handleChange}
        // size="small"
        sx={{ mb: 2 }}
      >
        <Tab value="consolidado" label ="Consolidado" />
        <Tab value="tendencia" disabled={!grupoId} label = "Tendência" />
      </Tabs>

      {tipo === "consolidado" ? (
        <GraficoFinanceiroConsolidado data={data} />
      ) : (
        <GraficoTendenciaPorGrupo grupoId={grupoId} />
      )}
    </Box>
  );
}