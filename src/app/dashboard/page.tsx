"use client";

import { Grid, Paper } from "@mui/material";
import { OrcadoCard } from "./components/orcadoCard";
import UseOrcadoTotal from "../../features/orcado/use.orcado";
import UseRealizadoTotal from "../../features/realizado/use.realizado";
// import { useFinanceiroVariacao } from "@/modulos/financeiro/useFinanceiro";
import CollapsibleTable from "../../modulos/financeiro/table";
import { GraficoFinanceiro } from "@/modulos/financeiro/grafico";
// import { OrcadoCardCopy } from "./components/orcadoCard copy";
import { VariacaoPieChart } from "./components/vairacaoPieChart";
import { NavBar } from "./components/navBar";


const dashboard = () => {
  const orcadoTotal = UseOrcadoTotal();
  const realizadoTotal = UseRealizadoTotal();
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
      <Grid container>
        <Grid size={{ xs: 12, md: 4 }}>
          <CollapsibleTable />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            sx={{ p: 2, height: 400, margin: 4, boxShadow: 3, borderRadius: 2 }}
          >
            <GraficoFinanceiro />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default dashboard;
