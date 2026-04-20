"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  UseFinanceiroResumoAnualPorGrupo,
  UseFinanceiroResumoAnualPorSubGrupo,
  UseFinanceiroResumoMensalPorGrupo,
} from "@/features/financeiro/use.financeiro";
import { ResumoUI } from "@/features/financeiro/financeiro.types";


export default function CollapsibleTable({
  onSelectGrupo,
  onSelectSubGrupo,
  selectedGrupoId,
  anoSelecionado,
  mesSelecionado,
  modo
}: {
  onSelectGrupo: (row: ResumoUI) => void;
  onSelectSubGrupo: (row: ResumoUI) => void;
  selectedGrupoId?: string;
  anoSelecionado:number;
  mesSelecionado:number;
  modo:"consolidado" | "mensal";
}) {
  const { data: gruposAnual, loading: loadingAnual } = UseFinanceiroResumoAnualPorGrupo(anoSelecionado);
  const { data: gruposMensal, loading: loadingMensal } = UseFinanceiroResumoMensalPorGrupo(anoSelecionado, mesSelecionado);
  const { data: subGrupos } = UseFinanceiroResumoAnualPorSubGrupo(anoSelecionado, selectedGrupoId ?? "");

  const isMensal = modo === "mensal" && !!mesSelecionado;
  const grupos = isMensal ? gruposMensal : gruposAnual;
  const loading = isMensal ? loadingMensal : loadingAnual;

  if (loading) return <span>Carregando...</span>;

  const isSubGrupo = !!selectedGrupoId;

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
          <TableRow sx={{ fontSize: "0.9rem" }}>
            <TableCell>Grupo</TableCell>
            <TableCell align="left">Orçado</TableCell>
            <TableCell align="left">Realizado</TableCell>
            <TableCell align="left">Variação</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {!isSubGrupo &&
            grupos.map((row, index) => (
              <TableRow
                key={row.id_grupo}
                onClick={() => onSelectGrupo(row)}
                sx={(theme) => ({
                  "& td": {
                    fontSize: "0.6rem",
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
                <TableCell>{row.descricao}</TableCell>

                <TableCell align="right">
                  {row.orcado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>

                <TableCell align="right">
                  {row.realizado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>

                <TableCell align="right" sx={{ color: row.ui.color }}>
                  {row.ui.icon} {Math.abs(row.variacao).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          {isSubGrupo &&
            subGrupos.map((row, index) => (
              <TableRow
                key={row.id_grupo}
                onClick={() => onSelectSubGrupo(row)}
                sx={(theme) => ({
                  "& td": {
                    fontSize: "0.6rem",
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
                <TableCell>{row.descricao}</TableCell>

                <TableCell align="right">
                  {row.orcado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>

                <TableCell align="right">
                  {row.realizado.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>

                <TableCell align="right" sx={{ color: row.ui.color }}>
                  {row.ui.icon} {Math.abs(row.variacao).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
