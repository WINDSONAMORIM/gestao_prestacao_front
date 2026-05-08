import { Theme } from "@mui/material";
import { ResumoPorGrupo, ResumoUI } from "./financeiro.types";

export const mapResumo = (
  item: ResumoPorGrupo,
  theme: Theme
): ResumoUI => {

  const orcado = item.orcado ?? 0;
  const realizado = item.realizado ?? 0;

  let variacao = 0;

  if(orcado === 0){
    variacao = realizado === 0 ? 0 : realizado;
  }else{
    variacao = ((realizado - orcado) / orcado) * 100;
  } 

  const isPositivo = variacao > 0;
  const isNegativo = variacao < 0;

  let icon = isPositivo
    ? "▲"
    : isNegativo
    ? "▼"
    : "";

 if (orcado === 0 && realizado > 0) {
  variacao = realizado;
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

export const mapResumoList = (
  data: ResumoPorGrupo[],
  theme: Theme
): ResumoUI[] => {
  return data.map((item) => mapResumo(item, theme));
};

export const meses = [
  { label: "Jan", value: 1 },
  { label: "Fev", value: 2 },
  { label: "Mar", value: 3 },
  { label: "Abr", value: 4 },
  { label: "Mai", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Ago", value: 8 },
  { label: "Set", value: 9 },
  { label: "Out", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dez", value: 12 },
];