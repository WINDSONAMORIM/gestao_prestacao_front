"use client"

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { TableResponseApi } from "@/types/apiResponse";
import { ProcessoMyflux } from "../myFlux/myFlux.types";
import ErrorIcon from "@mui/icons-material/Error";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DownloadingIcon from '@mui/icons-material/Downloading';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TableMy = ({ headers, data }: TableResponseApi<ProcessoMyflux>) => {

    return (
        <TableContainer>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: "primary.main",
                        }}>
                        {headers.map((h, index) => (
                            <TableCell key={index}
                                sx={{
                                    color: "white",
                                    fontWeight: "bold",
                                }}>
                                {h}
                            </TableCell>
                        ))
                        }
                        <TableCell sx={{
                                    color: "white",
                                    fontWeight: "bold",
                                }}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rindex) => (
                        <TableRow hover
                            key={row.Id}
                            sx={{
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}>
                            <TableCell >
                                {row.Seq}
                            </TableCell>
                            <TableCell >
                                {row.Id}
                            </TableCell>
                            {row.status === "pendente" && (
                                <MoreHorizIcon />
                            )}

                            {row.status === "baixando" && (
                                <DownloadingIcon color="warning"/>
                            )}

                            {row.status === "concluido" && (
                                <CheckCircleIcon color="success"/>
                            )}

                            {row.status === "erro" && (
                                <ErrorIcon color="error"/>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableMy;