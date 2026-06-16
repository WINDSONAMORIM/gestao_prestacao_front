import { useEffect } from "react";
import { ProcessoMyflux } from "./myFlux.types";
import { TableResponseApi } from "@/types/apiResponse";

export const useDownloadEvents = (
  setTableData: React.Dispatch<React.SetStateAction<TableResponseApi<ProcessoMyflux> | null>>
) => {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL?.replace(/\/$/, "");
    const eventSource = new EventSource(`${baseUrl}/downloadProcess/events`);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setTableData((old) => {
        if (!old) return old;

        return {
          ...old,
          data: old.data.map((item) =>
            item.Id === data.processoId
              ? { ...item, status: data.status }
              : item
          ),
        };
      });
    };

    eventSource.onerror = (err) => {
      console.error("Erro na conexão SSE:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [setTableData]); 
};
