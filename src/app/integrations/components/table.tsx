"use client"

import { Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { TableResponseApi } from "@/types/apiResponse";
import { ProcessoMyflux } from "../myFlux/myFlux.types";
import ErrorIcon from "@mui/icons-material/Error";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DownloadingIcon from '@mui/icons-material/Downloading';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { on } from "node:stream";

type TableMyProps = TableResponseApi<ProcessoMyflux> & {
  onCheck : (id: string, checked: boolean)=>void; 
}

const TableMy = ({ headers, data, onCheck }: TableMyProps) => {

    return (
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "primary.main",
              }}
            >
              {headers.map((h, index) => (
                <TableCell
                  key={index}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {h}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Valida Pedido
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Selecionar
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rindex) => (
              <TableRow
                hover
                key={rindex}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell>{row.Seq}</TableCell>
                <TableCell>{row.Id}</TableCell>
                <TableCell>
                  <Box component="span">
                    {row.status === "pendente" && <MoreHorizIcon />}

                    {row.status === "baixando" && (
                      <DownloadingIcon color="warning" />
                    )}

                    {row.status === "concluido" && (
                      <CheckCircleIcon color="success" />
                    )}

                    {row.status === "erro" && <ErrorIcon color="error" />}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box component="span">{row.validaPedido ? "Sim" : "Não"}</Box>
                </TableCell>
                <TableCell>
                  <Checkbox checked={row.check} onChange = {(e)=>onCheck(row.Id, e.target.checked)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default TableMy;