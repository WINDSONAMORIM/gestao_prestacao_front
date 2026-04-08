"use client";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, ComposedChart, Line, YAxis, CartesianGrid } from "recharts";
import { useTheme } from "@mui/material";

import { UseFinanceiro } from "../../features/financeiro/use.financeiro";
import { ResumoPorGrupo } from "@/features/financeiro/financeiro.types";

interface customTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: ResumoPorGrupo }>;
}

const CustomTooltip = ({ active, payload }: customTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;

    return (
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <strong>{item.descricao}</strong>
        <br />
        Orçado:{" "}
        {item.orcado?.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
        <br />
        Realizado:{" "}
        {item.realizado?.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </div>
    );
  }

  return null;
};

export function GraficoFinanceiro() {
  const theme = useTheme();
  const { data }: { data: ResumoPorGrupo[] } = UseFinanceiro();
   const dataComPercentual = data.map((item) => ({
    ...item,
    percentual: item.orcado
      ? (item.realizado / item.orcado) * 100
      : 0,
  }));
  
  console.log("Dados para o gráfico:", data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={dataComPercentual}>

       {/* <BarChart data={data}> */}
        <XAxis
          dataKey="id"
          stroke={theme.palette.text.primary}
          angle={-45}
          textAnchor="end"
          interval={0}
        />
      
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="orcado" fill={theme.palette.primary.main} name="orçado" />
        <Bar
          dataKey="realizado"
          fill={theme.palette.secondary.main}
          name="realizado"
        />
      {/* </BarChart> */}
      <Line
          yAxisId="right"
          type="monotone"
          dataKey="percentual"
          stroke="#22c55e"
          name="% Execução"
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}