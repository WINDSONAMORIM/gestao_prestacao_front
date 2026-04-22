"use client";

import { Breadcrumbs as MUIBreadcrumbs, Link, Typography, Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsightsIcon from "@mui/icons-material/Insights";
import GroupsIcon from '@mui/icons-material/Groups';
import { motion } from "framer-motion";

import { ResumoUI } from "@/features/financeiro/financeiro.types";

interface Props {
  grupoSelecionado: ResumoUI | null;
  subGrupoSelecionado: ResumoUI | null;
  setGrupoSelecionado: React.Dispatch<React.SetStateAction<ResumoUI | null>>;
  setSubGrupoSelecionado: React.Dispatch<React.SetStateAction<ResumoUI | null>>;
}

const MotionLink = motion.create(Link);

export const BreadcrumbsModern = ({
  grupoSelecionado,
  subGrupoSelecionado,
  setGrupoSelecionado,
  setSubGrupoSelecionado,
}: Props) => {
  return (
    <Box sx={{ mb: 2 }}>
      <MUIBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <MotionLink
          underline="hover"
          color="inherit"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
          }}
          onClick={() => {
            setGrupoSelecionado(null);
            setSubGrupoSelecionado(null);
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <HomeIcon fontSize="small" />
          Geral
        </MotionLink>

        {grupoSelecionado && (
          <MotionLink
            underline="hover"
            color="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              cursor: "pointer",
            }}
            onClick={() => setSubGrupoSelecionado(null)}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            {grupoSelecionado.descricao === "PESSOAL E REFLEXO" ? <GroupsIcon /> :
            <BarChartIcon fontSize="small" />}
            {grupoSelecionado.descricao}
          </MotionLink>
        )}

        {subGrupoSelecionado && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                fontWeight: 600,
                color: "primary.main",
              }}
            >
              <InsightsIcon fontSize="small" />
              {subGrupoSelecionado.descricao}
            </Typography>
          </motion.div>
        )}
      </MUIBreadcrumbs>
    </Box>
  );
};