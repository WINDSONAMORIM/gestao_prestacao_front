"use client";

import { Box, Chip, Grid, Paper, Typography, useTheme } from "@mui/material";
import { OrcadoCard } from "./components/orcadoCard";
import { useOrcadoModo } from "../../features/orcado/use.orcado";
import { useRealizadoModo } from "../../features/realizado/use.realizado";
import CollapsibleTable from "../../modulos/financeiro/table/tableBase";
import { GraficoFinanceiro } from "@/modulos/financeiro/grafico";
import { VariacaoPieChart } from "./components/vairacaoPieChart";
import { NavBar } from "./components/navBar";
import { ResumoUI } from "@/features/financeiro/financeiro.types";
import { useState } from "react";
import { meses } from "@/features/financeiro/financeiro.mapper";
import { BreadcrumbsModern } from "@/modulos/financeiro/breadcrumbs";
import { TableExcedente } from "@/modulos/financeiro/table/tableExcedente";
import { FiltroPeriodo, Mes } from "@/modulos/financeiro/handleTabChange";
// import { Mes } from "@/modulos/financeiro/toggle";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import SpeedIcon from "@mui/icons-material/Speed";

import EditAttributesIcon from "@mui/icons-material/EditAttributes";

const Dashboard = () => {
  // const orcadoTotal = UseOrcadoTotal();
  // const realizadoTotal = UseRealizadoTotal();
  const [grupoSelecionado, setGrupoSelecionado] = useState<ResumoUI | null>(
    null,
  );
  const [subGrupoSelecionado, setSubGrupoSelecionado] =
    useState<ResumoUI | null>(null);
  const [modo, setModo] = useState<"consolidado" | "mensal">("consolidado");
  const [mesSelecionado, setMesSelecionado] = useState<Mes | null>(null);
  const [anoSelecionado, setAnoSelecionado] = useState<number>(2026);

  const realizadoTotal = useRealizadoModo(
    modo,
    anoSelecionado,
    mesSelecionado?.value ?? 0,
  );
  const orcadoTotal = useOrcadoModo(
    modo,
    anoSelecionado,
    mesSelecionado?.value ?? 0,
  );

  const getTitulo = () => {
    const isTendencia = !!grupoSelecionado;

    if (isTendencia) return "Tendência Anual";
    if (modo === "consolidado") return "Análise Anual";
    if (modo === "mensal") return "Análise Mensal";

    return "";
  };

  const theme = useTheme();
  return (
    <>
      <NavBar />
      <Grid container spacing={4} padding={2} alignItems="stretch">
        <Grid size={{ xs: 12, md: 3 }}>
          <OrcadoCard
            title="Total Orçado"
            callback={orcadoTotal}
            backgroundColor={theme.palette.orcado.main}
            // imageSrc="/assets/icons/card_orcado.png"
            icon={<AttachMoneyIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <OrcadoCard
            title="Total Realizado"
            callback={realizadoTotal}
            backgroundColor={theme.palette.realizado.main}
            // imageSrc="/assets/icons/card_realizado.png"
            icon={<WifiTetheringIcon />}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <VariacaoPieChart
            orcado={orcadoTotal.value || 0}
            executado={realizadoTotal.value || 0}
            icon={<SpeedIcon />}
            backgroundColor={theme.palette.primary.main}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FiltroPeriodo
            modo={modo}
            setModo={setModo}
            anoSelecionado={anoSelecionado}
            setAnoSelecionado={setAnoSelecionado}
            mesSelecionado={mesSelecionado}
            setMesSelecionado={setMesSelecionado}
            meses={meses}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} paddingLeft={4}>
        <BreadcrumbsModern
          grupoSelecionado={grupoSelecionado}
          subGrupoSelecionado={subGrupoSelecionado}
          setGrupoSelecionado={setGrupoSelecionado}
          setSubGrupoSelecionado={setSubGrupoSelecionado}
        />
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
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6">
                {getTitulo()}
              </Typography>

              {grupoSelecionado && (
                <>
                  <Typography
                    variant="h6"
                    onClick={() => setSubGrupoSelecionado(null)}
                  >
                    {`${grupoSelecionado.descricao}`}
                  </Typography>
                </>
              )}
              <Chip
                label={ mesSelecionado ? mesSelecionado.label : anoSelecionado}
                color="primary"
                sx={{ flexShrink: 0 }}
              />
            </Box>
            <GraficoFinanceiro
              selecionado={grupoSelecionado}
              ano={anoSelecionado}
              mes={mesSelecionado?.value ?? 0}
              modo={modo}
            />
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
              selectedGrupoId={grupoSelecionado?.id_grupo}
              onSelectGrupo={(grupo) => {
                setGrupoSelecionado(grupo);
                setSubGrupoSelecionado(null);
              }}
              onSelectSubGrupo={(subGrupo) => {
                setSubGrupoSelecionado(subGrupo);
              }}
              anoSelecionado={anoSelecionado}
              mesSelecionado={mesSelecionado?.value ?? meses[0].value}
              modo={modo}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container m={2}>
        <Paper
          sx={{
            width: "100%",
            p: 2,
            boxShadow: 3,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>TOP 5 GRUPOS EXCENDENTES</Typography>
          <Grid size={12}>
            <TableExcedente ano={anoSelecionado} />
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default Dashboard;
