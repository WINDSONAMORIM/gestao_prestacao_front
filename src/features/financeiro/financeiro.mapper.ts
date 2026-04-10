import { Theme } from "@mui/material";
import { ResumoPorGrupo, ResumoUI } from "./financeiro.types";

export const mapResumo = (
  item: ResumoPorGrupo,
  theme: Theme
): ResumoUI => {

  const orcado = item.orcado ?? 0;
  const realizado = item.realizado ?? 0;

  let variacao = ((realizado - orcado) / orcado) * 100;
  
  const isPositivo = variacao > 0;
  const isNegativo = variacao < 0;

  let icon = isPositivo
    ? "▲"
    : isNegativo
    ? "▼"
    : "";

 if (orcado === 0 && realizado > 0) {
  variacao = realizado; // ou outro valor
  icon = "▼";
}   

  const color = isPositivo
    ? theme.palette.error.main     
    : isNegativo
    ? theme.palette.success.main   
    : theme.palette.text.secondary;

  return {
    ...item,
    orcado,
    realizado,
    variacao,
    ui: {
      color,
      icon,
    },
  };
}

export const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];