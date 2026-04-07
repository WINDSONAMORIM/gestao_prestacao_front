"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useFinanceiro } from "@/modulos/financeiro/useFinanceiro";
import {
  ResumoPorGrupo,
} from "../../app/dashboard/components/financeiroService";
import { ApiResponse } from "@/types/apiResponse";

function Row(props: { row: ResumoPorGrupo; index: number }) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={(theme) => ({
          backgroundColor:
            index % 2 === 0
              ? theme.palette.action.hover
              : theme.palette.background.paper,
          transition: "0.2s",
          "&:hover": { backgroundColor: theme.palette.action.selected },
        })}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">
          <span style={{ color: row.realizado > row.orcado ? "red" : "green" }}>
            {row.orcado.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </TableCell>
        <TableCell align="right">
          {row.realizado.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Descrição
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>{row.descricao}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const {
    data,
    loading,
  }: {
    data: ApiResponse<ResumoPorGrupo[]>;
    loading: boolean;
  } = useFinanceiro();
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 400, ml: 3, boxShadow: 3 }}
    >
      <Table
        size="small"
        sx={{
          borderCollapse: "separate",
          "& .MuiTableCell-root": {
            py: 0.5,
            px: 1,
            borderBottom: "none",
          },
        }}
        aria-label="collapsible table"
      >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Grupo</TableCell>
            <TableCell align="right">Orçado</TableCell>
            <TableCell align="right">Realizado</TableCell>
            {/* <TableCell align="right">Diferença</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.map((row, index) => (
            <Row key={row.id} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
