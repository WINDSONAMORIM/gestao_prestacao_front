"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { ResumoUI } from "@/features/resumoFinanceiro/financeiro.types";
import { useDrillStore } from "@/store/drillStore";
import { useFinanceiroResumo } from "@/features/resumoFinanceiro/useQuery";

interface Props {
  modo: "mensal" | "consolidado";
  anoSelecionado: number;
  mesSelecionado: number;
}

export const CollapsibleTable = ({
  modo,
  anoSelecionado,
  mesSelecionado,
}: Props) => {
  const {
    level,
    grupoId,
    subgrupoId,
    drillDownGrupo,
    drillDownSubgrupo,
  } = useDrillStore();

  const { data: rows = [], isLoading } = useFinanceiroResumo({
    nivel: level,
    modo,
    ano: anoSelecionado,
    mes: mesSelecionado,
    grupoId,
    subgrupoId,
  });

  const handleRowClick = (row: ResumoUI) => {
    if (level === "grupo") {
      drillDownGrupo(row.id_grupo!, row.descricao);
    } else if (level === "subgrupo") {
      drillDownSubgrupo(row.id_subgrupo!, row.descricao);
    }
  };

  return (
    <TableContainer>
      <Table
        size="small"
        sx={{
          "& .MuiTableCell-root": {
            py: 0.3,
            px: 1,
            borderBottom: "none",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell align="left">Orçado</TableCell>
            <TableCell align="left">Realizado</TableCell>
            <TableCell align="center">Variação</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={
                level === "grupo"
                  ? `g-${row.id_grupo}`
                  : level === "subgrupo"
                    ? `sg-${row.id_subgrupo}`
                    : `r-${row.id_rubrica}`
              }
              onClick={
                level !== "rubrica" ? () => handleRowClick(row) : undefined
              }
              sx={(theme) => ({
                "& td": {
                  fontSize: "0.7rem",
                },
                backgroundColor:
                  index % 2 === 0
                    ? theme.palette.action.hover
                    : theme.palette.background.paper,
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: theme.palette.action.selected,
                  cursor: level !== "rubrica" ? "pointer" : "default",
                },
              })}
            >
              <TableCell>{row.descricao}</TableCell>

              <TableCell align="left">
                {row.orcado.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>

              <TableCell align="left">
                {row.realizado.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>

              <TableCell align="center" sx={{ color: row.ui?.color }}>
                {row.ui?.icon}{" "}
                {Math.abs(row.variacao).toLocaleString("pt-BR", {
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
  );
};