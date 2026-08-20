"use client";

import { useExcedenteStore } from "@/store/excedenteStore";
import { Box, Divider, Paper, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import GroupsIcon from "@mui/icons-material/Groups";

export const Indicadores = () => {
  const excedentes = useExcedenteStore((state) => state.excedentes);

  if (!excedentes.length) {
    return (
      <Paper
        sx={{
          width: "100%",
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography>Carregando indicadores...</Typography>
      </Paper>
    );
  }

  const maiorExcedente = excedentes.reduce((maior, atual) =>
    atual.diferenca > maior.diferenca ? atual : maior,
  );

  const maiorEstouro = excedentes.reduce((maior, atual) =>
    atual.perc > maior.perc ? atual : maior,
  );

  const maiorEconomia = excedentes.reduce((maior, atual) =>
    atual.diferenca < maior.diferenca ? atual : maior,
  );

  const gruposAcimaOrcado = excedentes.filter((item) => item.perc > 100).length;

  const percentualEstouro = maiorEstouro.perc - 100;

  return (
    <Paper
      sx={{
        width: "98%",
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{mb: 1,fontWeight: 500,}}
      >
        INDICADORES ORÇAMENTÁRIOS
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            px: 2,
          }}
        >
          <AttachMoneyIcon
            sx={{
              fontSize: 32,
              mb: 0.5,
            }}
          />

          <Typography variant="body2">Maior excedente</Typography>

          <Typography variant="h6" fontWeight="bold">
            {maiorExcedente.diferenca.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Typography>

          <Typography variant="caption">
            Grupo {maiorExcedente.id_grupo}
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box
          sx={{
            textAlign: "center",
            px: 2,
          }}
        >
          <TrendingUpIcon
            sx={{
              fontSize: 32,
              mb: 0.5,
            }}
          />

          <Typography variant="body2">Maior estouro do orçamento</Typography>

          <Typography variant="h6" fontWeight="bold">
            +
            {percentualEstouro.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            %
          </Typography>

          <Typography variant="caption">
            Grupo {maiorEstouro.id_grupo}
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box
          sx={{
            textAlign: "center",
            px: 2,
          }}
        >
          <TrendingDownIcon
            sx={{
              fontSize: 32,
              mb: 0.5,
            }}
          />

          <Typography variant="body2">Maior economia</Typography>

          <Typography variant="h6" fontWeight="bold">
            {Math.abs(maiorEconomia.diferenca).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Typography>

          <Typography variant="caption">
            Grupo {maiorEconomia.id_grupo}
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box
          sx={{
            textAlign: "center",
            px: 2,
          }}
        >
          <GroupsIcon
            sx={{
              fontSize: 32,
              // mb: 0.5,
            }}
          />

          <Typography variant="body2">Acima do orçamento</Typography>

          <Typography variant="h6" fontWeight="bold">
            {gruposAcimaOrcado} / {excedentes.length}
          </Typography>
          <Typography variant="caption">grupos</Typography>

        </Box>
      </Box>
    </Paper>
  );
};
