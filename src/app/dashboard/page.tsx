"use client";

import { Autocomplete, Grid, Paper, TextField, useTheme } from "@mui/material";
import { OrcadoCard } from "./components/orcadoCard";
import UseOrcadoTotal from "../../features/orcado/use.orcado";
import UseRealizadoTotal from "../../features/realizado/use.realizado";
import CollapsibleTable from "../../modulos/financeiro/table/tableBase";
import { GraficoFinanceiro } from "@/modulos/financeiro/grafico";
import { VariacaoPieChart } from "./components/vairacaoPieChart";
import { NavBar } from "./components/navBar";
import { ResumoUI } from "@/features/financeiro/financeiro.types";
import { useState } from "react";

const Dashboard = () => {
  const orcadoTotal = UseOrcadoTotal();
  const realizadoTotal = UseRealizadoTotal();
  const [grupoSelecionado, setGrupoSelecionado] = useState<ResumoUI | null>(null);
  const [subGrupoSelecionado, setSubGrupoSelecionado] = useState<ResumoUI | null>(null);
  // const variacao = useFinanceiroVariacao();
  const theme = useTheme();
  return (
    <>
      <NavBar />
      <Grid container spacing={4} padding={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <OrcadoCard
            title="Total Orçado"
            callback={orcadoTotal}
            backgroundColor={theme.palette.orcado.main}
            imageSrc="/assets/icons/card_orcado.png"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <OrcadoCard
            title="Total Realizado"
            callback={realizadoTotal}
            backgroundColor={theme.palette.realizado.main}
            imageSrc="/assets/icons/card_realizado.png"
          />
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
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 1 }}>
          {(grupoSelecionado || subGrupoSelecionado) && (
            <button
              onClick={() => {
                if (subGrupoSelecionado) {
                  setSubGrupoSelecionado(null);
                } else {
                  setGrupoSelecionado(null);
                }
              }}
            >
              ← Voltar
            </button>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <div style={{ marginBottom: 16 }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setGrupoSelecionado(null);
                setSubGrupoSelecionado(null);
              }}
            >
              ANALISE GERAL CONSOLIDADA
            </span>

            {grupoSelecionado && (
              <>
                {" > "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setSubGrupoSelecionado(null)}
                >
                  {`COMPARATIVO MENSAL - ${grupoSelecionado.descricao}`}
                </span>
              </>
            )}

            {subGrupoSelecionado && (
              <>
                {" > "}
                <span>{subGrupoSelecionado.descricao}</span>
              </>
            )}
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Autocomplete
            disablePortal
            options={["2025", "2026"]}
            renderInput={(params) => <TextField {...params} label="ANO" />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} padding={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            sx={{
              width: "100%",
              p: 2,
              height: 400,
              boxShadow: 3,
              borderRadius: 2,
              display: "flex",
            }}
          >
            <GraficoFinanceiro selecionado={grupoSelecionado} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              width: "100%",
              p: 2,
              height: 400,
              boxShadow: 3,
              borderRadius: 2,
              display: "flex",
            }}
          >
            <CollapsibleTable
              selectedGrupoId={grupoSelecionado?.id}
              onSelectGrupo={(grupo) => {
                setGrupoSelecionado(grupo);
                setSubGrupoSelecionado(null);
              }}
              onSelectSubGrupo={(subGrupo) => {
                setSubGrupoSelecionado(subGrupo);
              }}

            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
