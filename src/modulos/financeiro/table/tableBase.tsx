"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useState } from "react";

import { UseFinanceiro } from "@/features/financeiro/use.financeiro";
import { ResumoUI } from "@/features/financeiro/financeiro.types";
import { RowGrupo } from "./rowGrupo";

export default function CollapsibleTable({
  onSelect, 
  selectedId
}:
{
  onSelect:(row: ResumoUI)=>void; 
  selectedId?:string;
}) {
  const { data, loading }: { data: ResumoUI[]; loading: boolean } =
    UseFinanceiro();

  if (loading) return <span>Carregando...</span>;

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
            <TableCell>Grupo</TableCell>
            <TableCell align="right">Orçado</TableCell>
            <TableCell align="right">Realizado</TableCell>
            <TableCell align="right">Variação</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((row, index) => (
            <RowGrupo
              key={row.id}
              row={row}
              index={index}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}