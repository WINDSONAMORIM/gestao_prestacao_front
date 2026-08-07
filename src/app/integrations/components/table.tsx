"use client"

import { Badge, Box, Checkbox, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { TableResponseApi } from "@/types/apiResponse";
import { ProcessoMyflux } from "../myFlux/myFlux.types";
import ErrorIcon from "@mui/icons-material/Error";
import PendingIcon from '@mui/icons-material/Pending';
import DownloadingIcon from '@mui/icons-material/Downloading';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

type TableMyProps = TableResponseApi<ProcessoMyflux> & {
  onCheck : (id: string, checked: boolean)=>void; 
}

const TableMy = ({ headers, data, onCheck }: TableMyProps) => {
  console.log(headers)
  const columns: GridColDef[] = [
  ...headers
  .filter((h)=> h && h.trim() !=="")
  .map((h) => ({
    field: h,
    headerName: h,
    width: 200,
  })),
  {
    field: "status",
    headerName: "Status",
    width: 120,
    sortable: false,

    renderCell: (params) => {
      console.log("STATUS:", params.row);
      console.log("VALUE:", params.value);
      switch (params.value) {
        case "pendente":          
          return <Chip icon={<PendingIcon color="disabled" />}label="Pendente"></Chip> 
        case "baixando":
          return <Chip icon={<DownloadingIcon color="warning" />}label="Baixando"></Chip>;
        case "concluido":
          return <Chip icon={<CheckCircleIcon color="success" />}label="Concluido"></Chip>;
        case "erro":
          return <Chip icon={<ErrorIcon color="error" />}label="Erro"></Chip>;
        default:
          return null;
      }
    },
  },
  {
    field: "validaPedido",
    headerName: "Valida Pedido",
    width: 150,
    renderCell: (params) => (params.value ? "Sim" : "Não"),
  },
  {
    field: "check",
    headerName: "Selecionar",
    width: 120,
    
    renderCell: (params) => (
      <Checkbox
        checked={params.row.check}
        onChange={(e) =>
          onCheck(params.row.Id, e.target.checked)
        }
      />
    ),
  },
];
  const rows: GridRowsProp = data.map((row) => ({
    ...row,
    id: row.Seq,
    status: row.status ?? "pendente",
    validaPedido: row.validaPedido ?? false,
    check: row.check ?? true,
    
}));
  rows.map((m=>console.log("Row:",m)))
     return (
   <>
       <DataGrid columns={columns} rows={rows} pageSizeOptions={[5,10,20,50]}initialState={{pagination:{paginationModel:{pageSize:10}}}} sx={{
    border: 0,
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "primary.main",
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "primary.main",
    },

    // TEXTO HEADER
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold",
    },
     // ÍCONE SORT
    "& .MuiDataGrid-sortIcon": {
      color: "primar.main",
    },

    // LINHAS ZEBRADAS
    "& .MuiDataGrid-row:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },

    "& .MuiDataGrid-row:nth-of-type(even)": {
      backgroundColor: "#ffffff",
    },

    // HOVER
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#dbeafe",
    },

    // CÉLULAS
    "& .MuiDataGrid-cell": {
      borderBottom: "1px solid #e0e0e0",
    },
  }}
>

       </DataGrid>
       {/* <TableContainer>
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
      </TableContainer> */}
      </>
    );
}

export default TableMy;