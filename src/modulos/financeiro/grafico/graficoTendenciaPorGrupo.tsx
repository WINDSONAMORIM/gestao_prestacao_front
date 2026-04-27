"use client";

import { useTheme } from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TooltipTendenciaPorGrupo } from "../tooltip/tooltipTendenciaPorGrupo";
import { useMemo } from "react";

interface DataGrafico {
  mes: string;
  ordem: number;
  realizado: number | null;
  orcado: number | null;
}

export function GraficoTendenciaPorGrupo({dataGrafico}: {dataGrafico: DataGrafico[]}) {
  const theme = useTheme();
 
  const tendencia = dataGrafico.map((item) => ({
    ...item,
    realizado: item.realizado === 0 ? null : item.realizado,
  }));

  const domainY = useMemo<[number, number]>(() => {
    const validRealizado = dataGrafico
      .filter((d) => d.realizado !== null && d.realizado > 0)
      .map((d) => d.realizado as number);
    const validOrcado = dataGrafico
      .filter((d) => d.orcado !== null && d.orcado > 0)
      .map((d) => d.orcado as number);
    const allValidY = [...validRealizado, ...validOrcado];

    if (allValidY.length === 0) {
      return [0, 10];
    }

    let minY = Math.min(...allValidY);
    let maxY = Math.max(...allValidY);


    if (validRealizado.length > 0) {
      const minReal = Math.min(...validRealizado);
      const maxReal = Math.max(...validRealizado);
      const variation = minReal > 0 ? ((maxReal - minReal) / minReal) * 100 : 0;
      const padding = variation < 0.8 ? 0.1 : 0.025;
      minY = minY * (1 - padding);
      maxY = maxY * (1 + padding);
    }
    console.log("Min Y com padding:", minY, "Max Y com padding:", maxY);
    return [Math.max(0, minY), maxY];
  }, [dataGrafico]);

  const formatValue = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };
      

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={tendencia}>
        <defs>
          <linearGradient id="colorRealizado" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00E676" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#00E676" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <XAxis dataKey="mes" />
        <YAxis
          domain={domainY}
          tickFormatter={formatValue}
        />
        <Tooltip content={<TooltipTendenciaPorGrupo />} />
        <Legend />

        <Area
          type="monotone"
          dataKey="realizado"
          stroke={theme.palette.realizado.main}
          fill="url(#colorRealizado)"
          strokeWidth={3}
          name="Realizado"
        />

        <Line
          type="monotone"
          dataKey="orcado"
          stroke={theme.palette.orcado.main}
          strokeWidth={2}
          strokeDasharray="6 4"
          dot={false}
          name="Orçado"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
