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
import Paper from "@mui/material/Paper";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { UseFinanceiro } from "@/features/financeiro/use.financeiro";
import { ResumoPorGrupo } from "@/features/financeiro/financeiro.types";
import { fetchResumoPorSubGrupo } from "@/features/financeiro/financeiro.providers";
import { Typography } from "@mui/material";

function Row(props: { row: ResumoPorGrupo; index: number }) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);
  const [subGrupos, setSubGrupos] = React.useState<ResumoPorGrupo[]>([])

  React.useEffect(()=>{
    if(open && subGrupos.length === 0){
      fetchResumoPorSubGrupo().then((data)=>{
        const filtrados = data.filter((sub)=>
        sub.id.startsWith(row.id)
      );
      setSubGrupos(filtrados)
      });
    }
  },[open]);

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
            onClick={() => setOpen(!open)}
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
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
              {subGrupos.map((sub)=>(
                <Box
                  key={sub.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 0.5,
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <Typography variant="caption" >{sub.id} - {sub.descricao}</Typography>

                  <Typography variant="caption" >
                    {sub.realizado.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Typography>
              </Box>
              ))}
              </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const {data,loading}:{data: ResumoPorGrupo[]; loading: boolean; } = UseFinanceiro();
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 400, ml: 3, boxShadow: "none", background: "transparent"  }}
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
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <Row key={row.id} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
