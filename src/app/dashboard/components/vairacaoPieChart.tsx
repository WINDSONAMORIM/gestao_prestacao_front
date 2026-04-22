"use client";

import { Box, Card, useTheme } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";
import React, { useEffect, useState } from "react";

type Props = {
  orcado: number;
  executado: number;
  icon: React.ReactNode;
  backgroundColor?: string;
};

export function VariacaoPieChart({ orcado, executado, icon, backgroundColor }: Props) {
  const theme = useTheme();
  // const restante = Math.max(orcado - executado, 0);
  const percentual = orcado > 0 ? (executado / orcado) * 100 : 0;
  const variacao = orcado > 0 ? ((executado - orcado) / orcado) * 100 : 0;

  const isPositivo = variacao > 0;
  const isNegativo = variacao < 0;
  const arrow = isPositivo ? "▲" : isNegativo ? "▼" : "";

  const corVariacao = isPositivo
    ? theme.palette.error.main
    : isNegativo
      ? theme.palette.success.main
      : theme.palette.text.secondary;

  // const [animatedValue, setAnimatedValue] = useState(0);

  // useEffect(() => {
  //   let start = 0;
  //   const duration = 800;
  //   const stepTime = 10;
  //   const increment = executado / (duration / stepTime);

  //   const interval = setInterval(() => {
  //     start += increment;
  //     if (start >= executado) {
  //       start = executado;
  //       clearInterval(interval);
  //     }
  //     setAnimatedValue(start);
  //   }, stepTime);

  //   return () => clearInterval(interval);
  // }, [executado]);

  // const formatCurrency = (value: number) =>
  //   value.toLocaleString("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   });

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon && (
          <Box
            sx={{
              minHeight: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              color: "white",
              opacity: 0.8,
              backgroundColor: backgroundColor || theme.palette.background.paper,
              p:0.5
            }}
          >
            {icon}
          </Box>
        )}

        <svg width="0" height="0">
          <defs>
            {/* <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            > */}
              <stop offset="0%" stopColor={theme.palette.realizado.main} />
              <stop offset="100%" stopColor={theme.palette.orcado.main} />
            {/* </linearGradient> */}
          </defs>
        </svg>
        <Gauge
          key={`${orcado}-${executado}`}
          value={executado}
          // value={animatedValue}
          valueMax={orcado || 1}
          startAngle={-110}
          endAngle={110}
          innerRadius={"70%"}
          outerRadius={"100%"}
          sx={{
            [`& .MuiGauge-valueArc`]: {
              // fill: "url(#gaugeGradient)",
              fill: theme.palette.realizado.main,
            },
            [`& .MuiGauge-referenceArc`]: {
              fill: theme.palette.orcado.light,
            },
            "& .MuiGauge-valueText text": {
              fill: corVariacao,
              fontWeight: 700,
              fontSize: 14,
              transform: "translate(0px, -10px)",
            },
          }}
          text={`${arrow} ${percentual.toFixed(1)}%`}
        />
      </Card>
    </>
  );
}
