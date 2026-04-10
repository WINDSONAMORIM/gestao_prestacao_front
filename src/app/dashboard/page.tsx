"use client";

import { Autocomplete, Grid, Paper, TextField } from "@mui/material";
import { OrcadoCard } from "./components/orcadoCard";
import UseOrcadoTotal from "../../features/orcado/use.orcado";
import UseRealizadoTotal from "../../features/realizado/use.realizado";
import CollapsibleTable from "../../modulos/financeiro/table/tableBase";
import { GraficoFinanceiro } from "@/modulos/financeiro/grafico";
import { VariacaoPieChart } from "./components/vairacaoPieChart";
import { NavBar } from "./components/navBar";
import { ResumoUI } from "@/features/financeiro/financeiro.types";
import { useState } from "react";


const dashboard = () => {
  const orcadoTotal = UseOrcadoTotal();
  const realizadoTotal = UseRealizadoTotal();
  const [selecionado, setSelecionado] = useState<ResumoUI | null>(null)
  // const variacao = useFinanceiroVariacao();
  return (
    <>
      <NavBar />
      <Grid container spacing={4} padding={4}>
        <Grid size={{ xs: 12, md: 3 }}>
          <OrcadoCard title="Total Orçado" callback={orcadoTotal} backgroundColor="orcado.main" imageSrc="/assets/icons/card_orcado.png" />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <OrcadoCard title="Total Realizado" callback={realizadoTotal} backgroundColor="realizado.main" imageSrc="/assets/icons/card_realizado.png" />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <VariacaoPieChart
            orcado={orcadoTotal.value || 0}
            executado={realizadoTotal.value || 0}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <OrcadoCard title="Total Realizado" callback={realizadoTotal} />
        </Grid>
      </Grid>
      <Grid container spacing={4} padding={4}>
        <Grid size={{ xs: 12, md: 3 }}>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Autocomplete disablePortal options={["2025", "2026"]} renderInput={(params) => <TextField {...params} label="ANO" />} />
        </Grid>
      </Grid>
      <Grid container spacing={4} padding={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ width: "100%", p: 2, height: 400, boxShadow: 3, borderRadius: 2, display: "flex" }}>
            <GraficoFinanceiro selecionado={selecionado} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ width: "100%", p: 2, height: 400, boxShadow: 3, borderRadius: 2, display: "flex" }}>
            <CollapsibleTable onSelect={setSelecionado} selectedId={selecionado?.id} />
          </Paper>
        </Grid>
      </Grid >

    </>
  );
};

export default dashboard;
