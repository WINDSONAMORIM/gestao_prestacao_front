import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

const [tipoGrafico, setTipoGrafico] = useState<"consolidado" | "tendencia">("consolidado");

<Tabs
  value={tipoGrafico}
  onChange={(_, v) => setTipoGrafico(v)}
>
  <Tab label="Consolidado" value="consolidado" />
  <Tab label="Tendência" value="tendencia" />
</Tabs>