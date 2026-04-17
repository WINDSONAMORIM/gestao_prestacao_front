import { ResumoPorGrupo } from "@/features/financeiro/financeiro.types";

interface TendenciaTooltipItem {
  mes: string;
  realizado: number;
  orcado: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: {
    payload: TendenciaTooltipItem;
  }[];
}

export const TooltipTendenciaPorGrupo = ({ active, payload }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

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
        {item.mes}
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