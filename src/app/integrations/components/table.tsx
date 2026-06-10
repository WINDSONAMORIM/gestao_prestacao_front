"use client"

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { TableResponseApi } from "@/types/apiResponse";
import { ProcessoMyflux } from "../myFlux/myFlux.types";

// export interface ApiTableResponse {
//   headers: string[];
//   data: Record<string, string>[];
// }

// interface TableMyProps {
//     data: ApiTableResponse;
// }

const TableMy = ({ headers, data }: TableResponseApi<ProcessoMyflux>) => {
    return (
        <TableContainer component={Paper}>
           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {headers.map((h, index) => (
                            <TableCell key={index}>
                                {h}
                            </TableCell>
                        ))
                        }
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rindex) => (
                        <TableRow key={rindex}>
                            {/* {row.map((cell, cindex) => ( */}
                                <TableCell >
                                    {row.Id}
                                </TableCell>
                                <TableCell >
                                    {row.Seq}
                                </TableCell>
                            {/* ))} */}
                            <TableCell><CloudQueueIcon /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableMy;