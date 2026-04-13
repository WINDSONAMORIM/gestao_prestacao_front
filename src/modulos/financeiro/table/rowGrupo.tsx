import { fetchResumoPorSubGrupo } from "@/features/financeiro/financeiro.providers";
import { ResumoUI } from "@/features/financeiro/financeiro.types";
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useEffect, useState } from "react";
import { RowSubGrupo } from "./rowSubGrupo";

interface RowGrupoProps {
    row: ResumoUI;
    index: number;
    onSelect: (r: ResumoUI) => void;
    selectedId?: string;
}

export const RowGrupo = ({ row, onSelect, index, selectedId }: RowGrupoProps) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [subGrupos, setSubGrupos] = useState<ResumoUI[]>([]);

    useEffect(() => {
        if (open && subGrupos.length === 0) {
            fetchResumoPorSubGrupo(theme, row.id).then((data) => {
                const filtrados = data.filter((sub) =>
                    sub.id.startsWith(row.id)
                );
                setSubGrupos(filtrados);
            });
        }
    }, [open, theme, row.id]);

    return (
        <>
            <TableRow
                onClick={() => onSelect(row)}
                selected={selectedId === row.id}
                sx={(theme) => ({
                    "& td": {
                        fontSize: "0.75rem"
                    },
                    backgroundColor: index % 2 === 0
                        ? theme.palette.action.hover
                        : theme.palette.background.paper,
                    transition: "0.2s",
                    "&:hover": {
                        backgroundColor: theme.palette.action.selected
                    }
                })}
            >
                <TableCell>
                    <IconButton
                        size="small"
                        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell>{row.descricao}</TableCell>

                <TableCell align="right" >
                    {row.orcado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </TableCell>

                <TableCell align="right">
                    {row.realizado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </TableCell>

                <TableCell align="right" sx={{ color: row.ui.color }}>
                    {row.ui.icon} {Math.abs(row.variacao).toFixed(1)}%
                </TableCell>
            </TableRow >

            <TableRow>
                <TableCell colSpan={5} sx={{ p: 0 }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box>
                            <Table size="small" sx={{ backgroundColor: "#fafafa" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Subgrupo</TableCell>
                                        <TableCell align="right">Orçado</TableCell>
                                        <TableCell align="right">Realizado</TableCell>
                                        <TableCell align="right">Variação</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {subGrupos.map((sub) => (
                                        <RowSubGrupo key={sub.id} sub={sub} />
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}