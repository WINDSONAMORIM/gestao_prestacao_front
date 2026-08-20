import {
  UseFinanceiroExcendenteAno,
  UseFinanceiroExcendenteMensal,
} from "@/features/tendencia/use.tendencia";
import { useExcedenteStore } from "@/store/excedenteStore";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

interface TableExcedentePropos {
  ano: number;
  mes?: number;
}
export const TableExcedente = ({ ano, mes }: TableExcedentePropos) => {
  const { data, loading } = mes
    ? UseFinanceiroExcendenteMensal(ano, mes)
    : UseFinanceiroExcendenteAno(ano);

  const setExcedentes = useExcedenteStore((state) => state.setExcedentes);

  useEffect(() => {
    if (!loading && data) {
      setExcedentes(data);
    }
  }, [data, loading, setExcedentes]);

  if (loading) {
    return <span>Carregando...</span>;
  }

  if (loading) return <span>Carregando...</span>;

  return (
    <Paper
      sx={{
        width: "100%",
        height:"100%",
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        boxSizing:"border-box"
      }}
    >
      <Typography variant="subtitle1" sx={{ mb: 1, fontSize:"0.95rem", fontWeight: 600, letterSpacing:"0.02em" }}>
        TOP 5 GRUPOS EXCENDENTES
      </Typography>

      <TableContainer>
        <Table
          size="small"
          sx={{
            "& .MuiTableCell-root": {
              borderBottom: "none",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Grupo</Typography>
              </TableCell>
              <TableCell align="left">Orçado</TableCell>
              <TableCell align="left">Realizado</TableCell>
              <TableCell align="left">Diferença</TableCell>
              <TableCell align="center">%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={(theme) => ({
                  "& td": {
                    fontSize: "1rem",
                  },
                  backgroundColor:
                    index % 2 === 0
                      ? theme.palette.action.hover
                      : theme.palette.background.paper,
                  transition: "0.2s",
                  "&:hover": {
                    backgroundColor: theme.palette.action.selected,
                  },
                })}
              >
                <TableCell>{row.id_grupo}</TableCell>
                <TableCell>
                  {row.orcado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  {row.realizado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  {row.diferenca.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell align="center">
                  {row.perc.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  %
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
