"use client"

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { previewTable } from "../myFlux/integrations.myflux.service";

export interface ApiTableResponse {
  headers: string[];
  data: Record<string, string>[];
}

interface TableMyProps {
    data: ApiTableResponse;
}

const TableMy = ({ data }: TableMyProps) => {
    return (
        <TableContainer component={Paper}>
           <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {data.headers.map((h, index) => (
                            <TableCell key={index}>
                                {h}
                            </TableCell>
                        ))
                        }
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.data.map((row, rindex) => (
                        <TableRow key={rindex}>
                            {data.headers.map((cell, cindex) => (
                                <TableCell key={cindex}>
                                    {row[cell]}
                                </TableCell>
                            ))}
                            <TableCell><CloudQueueIcon /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableMy;