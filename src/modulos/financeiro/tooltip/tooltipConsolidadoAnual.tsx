import { ResumoPorGrupo } from "@/features/financeiro/financeiro.types";

interface ResumoTooltipItem {
  id: string;
  descricao: string;
  orcado: number;
  realizado: number;
  percentual: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: {
    payload: ResumoTooltipItem;
  }[];
}

export const TooltipConsolidadoAnual = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;

    return (
      <div
        style={{
          background: "rgba(255,255,255,0.9)",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <strong>
        {item.descricao}
         </strong>
        <br />
        Orçado:{" "}
        {item.orcado?.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
        <br />
        Realizado:{" "}
        {item.realizado?.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </div>
    );
  }

  return null;
};