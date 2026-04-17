"use client";

import { useTheme } from "@mui/material";
import { ResumoPorGrupo } from "@/features/financeiro/financeiro.types";
import { Area, AreaChart, Bar, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { UseFinanceiroResumoAnualPorGrupo } from "@/features/financeiro/use.financeiro";
import { TooltipTendenciaPorGrupo } from "../tooltip/tooltipTendenciaPorGrupo";

// interface DataGrafico {
//   mes: {
//     label: string;
//     value: number;
//   };
//   realizado: number;
//   orcado: number;
// }

interface DataGrafico {
  mes: string;
  ordem: number;
  realizado: number;
  orcado: number;
}

export function GraficoTendenciaPorGrupo({dataGrafico }: { dataGrafico: DataGrafico[] }) {
  const theme = useTheme();

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
          tickFormatter={(value) =>
            value >= 1_000_000
              ? `${(value / 1_000_000).toFixed(1)}M`
              : `${(value / 1_000).toFixed(0)}K`
          }
        />

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
