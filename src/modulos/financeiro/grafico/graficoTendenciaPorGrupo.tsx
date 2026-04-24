"use client";

import { useTheme } from "@mui/material";
import { Area, AreaChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TooltipTendenciaPorGrupo } from "../tooltip/tooltipTendenciaPorGrupo";

interface DataGrafico {
  mes: string;
  ordem: number;
  realizado: number;
  orcado: number;
}

export function GraficoTendenciaPorGrupo({ dataGrafico }: { dataGrafico: DataGrafico[] }) {
  const theme = useTheme();

  const valores = dataGrafico
    .flatMap(d => [d.realizado, d.orcado])
    .filter(v => v > 0); // evita zero zoando escala

  console.log(`Valores: ${valores}`)  

  const min = Math.min(...valores);
  const max = Math.max(...valores);
  
  const variacao = (max - min) / max;
  
  const range = max - min;
  
  console.log(`min: ${min}`) 
  console.log(`max: ${max}`) 
  console.log(`varicao: ${variacao}`) 
  console.log(`range: ${range}`) 

  const padding =
  range > 1_000_000
    ? range * 0.01   // milhões → super sensível
    : range * 0.01;  // valores menores → mais folga

  return (
    <ResponsiveContainer width="100%" height={300} >
      <AreaChart data={dataGrafico}>
        <defs>
          <linearGradient id="colorRealizado" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00E676" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#00E676" stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <XAxis dataKey="mes" />
        <YAxis
          domain={[min - padding, max + padding]}
          tickCount={6}
          allowDecimals={true}
          tickFormatter={(value) =>
            value >= 1_000_000
              ? `${(value / 1_000_000).toFixed(1)}M`
              : `${(value / 1_000).toFixed(0)}K`
          }
        />
        {/* <YAxis
          tickFormatter={(value) =>
            value >= 1_000_000
              ? `${(value / 1_000_000).toFixed(1)}M`
              : `${(value / 1_000).toFixed(0)}K`
          }
        /> */}

        <Tooltip content={<TooltipTendenciaPorGrupo />} />

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
