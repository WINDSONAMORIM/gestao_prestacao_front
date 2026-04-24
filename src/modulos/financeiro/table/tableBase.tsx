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
  UseFinanceiroResumoMensalPorSubGrupo,
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
  anoSelecionado: number;
  mesSelecionado: number;
  modo: "consolidado" | "mensal";
}) {
  const { data: gruposAnual, loading: loadingGrupoAnual } = UseFinanceiroResumoAnualPorGrupo(anoSelecionado);
  const { data: gruposMensal, loading: loadingGrupoMensal } = UseFinanceiroResumoMensalPorGrupo(anoSelecionado, mesSelecionado);
  const { data: subGruposAnual, loading: loadingSubGrupoAnual } = UseFinanceiroResumoAnualPorSubGrupo(anoSelecionado, selectedGrupoId ?? "");
  const { data: subGruposMensal, loading: loadingSubGrupoMensal } = UseFinanceiroResumoMensalPorSubGrupo(anoSelecionado, mesSelecionado, selectedGrupoId ?? "");

  const isMensal = modo === "mensal" && !!mesSelecionado;
  const grupos = isMensal ? gruposMensal : gruposAnual;
  const subGrupos = isMensal ? subGruposMensal : subGruposAnual;
  const loading = isMensal ? loadingGrupoMensal : loadingGrupoAnual;

  if (loading) return <span>Carregando...</span>;

  const isSubGrupo = !!selectedGrupoId;

  console.log("selectedGrupoId:", selectedGrupoId);
  console.log("subGrupos:", subGrupos);

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
            <TableCell>Descrição</TableCell>
            <TableCell align="left">Orçado</TableCell>
            <TableCell align="left">Realizado</TableCell>
            <TableCell align="center">Variação</TableCell>
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

                <TableCell align="center" sx={{ color: row.ui.color }}>
                  {row.ui.icon} {Math.abs(row.variacao).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}%
                </TableCell>
              </TableRow>
            ))}
          {isSubGrupo &&
            subGrupos.map((row, index) => (
              <TableRow
                key={row.id_subgrupo}
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
                  {row.ui.icon} {Math.abs(row.variacao).toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
