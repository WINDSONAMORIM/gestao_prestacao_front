"use client";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "@mui/material";
import { ResumoPorGrupo } from "../../app/dashboard/components/financeiroService";
import { useFinanceiro } from "./useFinanceiro";
import { ApiResponse } from "@/types/apiResponse";

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
          background: "#fff",
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
  const { data }: { data: ApiResponse<ResumoPorGrupo[]> } = useFinanceiro();
  console.log("Dados para o gráfico:", data); // Verifique os dados no console

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data.data}>
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
      </BarChart>
    </ResponsiveContainer>
  );
}
