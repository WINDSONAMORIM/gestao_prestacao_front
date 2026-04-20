import { UseFinanceiroExcendenteAno } from "@/features/financeiro/use.financeiro";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const TableExcedente = ({ ano }: { ano: number }) => {
  const { data, loading } = UseFinanceiroExcendenteAno(ano);

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
            <TableCell align="left">Orçado</TableCell>
            <TableCell align="left">Realizado</TableCell>
            <TableCell align="left">Diferença</TableCell>
            <TableCell align="center">%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={(theme) => ({
                "& td": {
                  fontSize: "0.6rem",
                },
                backgroundColor:
                  index % 2 === 0
                    ? theme.palette.action.hover
                    : theme.palette.background.paper,
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: theme.palette.action.selected,
                },
              })}
            >
              <TableCell>{row.id_grupo}</TableCell>
              <TableCell>
                {row.orcado.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>
                {row.realizado.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>
                {row.diferenca.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>
                {row.perc.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
