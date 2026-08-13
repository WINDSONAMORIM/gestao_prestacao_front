import { useEffect, useRef } from "react";
import { ProcessoMyflux } from "./myFlux.types";
import { TableResponseApi } from "@/types/apiResponse";

interface UseDownloadEventsProps {
  setTableData: React.Dispatch<
    React.SetStateAction<TableResponseApi<ProcessoMyflux> | null>
  >;
  connected: boolean;
}

export const useDownloadEvents = ({
  setTableData,
  connected,
}: UseDownloadEventsProps) => {
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!connected) return;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "");
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_BASE_API_URL não está definido");
      return;
    }

    const eventSource = new EventSource(`${baseUrl}/downloadProcess/events`);

    eventSourceRef.current = eventSource;
    eventSource.onopen = () => {
      console.log("SSE conectado");
    };

    eventSource.addEventListener("progress", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        setTableData((old) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((item) =>
              item.Id === data.processoId
                ? { ...item, status: data.status }
                : item,
            ),
          };
        });
      } catch (error) {
        console.error("Erro no evento progress:", error);
      }
    });

    eventSource.addEventListener("validation", (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        console.log("Validation:", data);

        setTableData((old) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((item) =>
              item.Id === data.processoId
                ? {
                    ...item,
                    ...(data.validaPedido !== undefined && {
                      validaPedido: data.validaPedido,
                    }),
                    ...(data.validaValor !== undefined && {
                      validaValor: data.validaValor,
                    }),
                  }
                : item,
            ),
          };
        });
      } catch (error) {
        console.error("Erro no evento validation:", error);
      }
    });
    eventSource.onerror = (err) => {
      console.error("Erro na conexão SSE:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [connected, setTableData]);
};
