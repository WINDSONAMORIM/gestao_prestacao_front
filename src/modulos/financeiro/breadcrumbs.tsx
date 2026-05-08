"use client";

import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography,
  Box,
} from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import BarChartIcon from "@mui/icons-material/BarChart";
import InsightsIcon from "@mui/icons-material/Insights";
import GroupsIcon from "@mui/icons-material/Groups";

import { motion } from "framer-motion";
import { useDrillStore } from "@/store/drillStore";

const MotionLink = motion.create(Link);

export const BreadcrumbsModern = () => {
  const {
    grupoDescricao,
    subgrupoDescricao,
    level,
    reset,
    voltar,
  } = useDrillStore();

  return (
    <Box sx={{ mb: 2 }}>
      <MUIBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {/* 🏠 GERAL */}
        <MotionLink
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}
          onClick={reset}
          whileHover={{ scale: 1.05 }}
        >
          <HomeIcon fontSize="small" />
          Geral
        </MotionLink>

        {/* 📊 GRUPO */}
        {grupoDescricao && (
          <MotionLink
            underline="hover"
            color="inherit"
            sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}
            onClick={voltar}
            whileHover={{ scale: 1.05 }}
          >
            {grupoDescricao === "PESSOAL E REFLEXO" ? (
              <GroupsIcon />
            ) : (
              <BarChartIcon fontSize="small" />
            )}
            {grupoDescricao}
          </MotionLink>
        )}

        {/* 📈 SUBGRUPO */}
        {subgrupoDescricao && (
          <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
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
              {subgrupoDescricao}
            </Typography>
          </motion.div>
        )}
      </MUIBreadcrumbs>
    </Box>
  );
};