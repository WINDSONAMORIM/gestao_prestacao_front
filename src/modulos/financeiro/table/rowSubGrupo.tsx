// import { ResumoUI } from "@/features/financeiro/financeiro.types";
// import { TableCell, TableRow } from "@mui/material";

// export const RowSubGrupo = ({ sub }: { sub: ResumoUI }) => {
//     return (
//         <TableRow sx={(theme) => ({
//             backgroundColor: theme.palette.action.hover,
//             "& td": {
//                 fontSize: "0.75rem",
//                 color: theme.palette.text.secondary,
//             },
//         })} >
//             <TableCell sx={{ pl: 6 }}>
//                 {sub.descricao}
//             </TableCell>

//             <TableCell align="right">
//                 {sub.orcado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
//             </TableCell>

//             <TableCell align="right">
//                 {sub.realizado.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
//             </TableCell>

//             <TableCell align="right" sx={{ color: sub.ui.color }}>
//                 {sub.ui.icon} {Math.abs(sub.variacao).toFixed(1)}%
//             </TableCell>
//         </TableRow>
//     );
// }