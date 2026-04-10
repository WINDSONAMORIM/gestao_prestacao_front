"use client";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, ComposedChart, Line, YAxis, CartesianGrid, Area, AreaChart } from "recharts";
import { useTheme } from "@mui/material";

import { UseFinanceiro, UseFinanceiroTendenciaPorGrupo } from "../../features/financeiro/use.financeiro";
import { ResumoPorGrupo, TendenciaPorGrupo } from "@/features/financeiro/financeiro.types";
import { meses } from "@/features/financeiro/financeiro.mapper";

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

export function GraficoFinanceiro({ selecionado, }: { selecionado: ResumoPorGrupo | null }) {
  const theme = useTheme();
  const { data }: { data: ResumoPorGrupo[] } = UseFinanceiro();
  const tendencia: TendenciaPorGrupo[] = UseFinanceiroTendenciaPorGrupo().data;

  const tendenciaFiltrada = selecionado
    ? tendencia.filter((item) => item.grupo === selecionado.id)
    : [];

  const dataGrafico = meses.map((mes, index) => {
    const registro = tendenciaFiltrada.find(t => t.mes === index + 1);

    return {
      mes,
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

  console.log("Dados para o gráfico:", data);

  if (selecionado) {
    // 👉 GRÁFICO DE LINHA (DETALHE)
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={dataGrafico}>
          <defs>
            <linearGradient id="colorRealizado" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#000046" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1CB5E0" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          <XAxis dataKey="mes" />
          <YAxis tickFormatter={(value) =>
            value >= 1_000_000
              ? `${(value / 1_000_000).toFixed(1)}M`
              : `${(value / 1_000).toFixed(0)}K`
          } />

          <Tooltip />

          {/* ÁREA - REALIZADO 🔥 */}
          <Area
            type="monotone"
            dataKey="realizado"
            stroke={theme.palette.realizado.main}
            fill="url(#colorRealizado)"
            strokeWidth={3}
            name="Realizado"
          />

          {/* LINHA - ORÇADO */}
          <Line
            type="monotone"
            dataKey="orcado"
            stroke="#94a3b8"
            strokeWidth={2}
            dot={false}
            name="Orçado"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
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