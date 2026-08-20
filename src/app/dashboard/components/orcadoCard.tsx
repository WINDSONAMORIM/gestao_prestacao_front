"use client";

import { Box, Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";

type OrcadoCardProps = {
  callback: { value: number | null; loading: boolean };
  title: string;
  backgroundColor?: string;
  imageSrc?: string;
  icon?: React.ReactNode
};

export const OrcadoCard = ({ callback, title, backgroundColor, imageSrc, icon }: OrcadoCardProps) => {

  const { value, loading } = callback;
  const theme = useTheme();
  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: 3,
        display: "flex",
        alignItems: "center",
        minHeight: 100,
        // backgroundColor: backgroundColor || "background.paper",
      }}
    >
      {icon && (
        <Box
          sx={{
            minHeight: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            color: "white",
            opacity: 0.8,
            backgroundColor: backgroundColor || "background.paper",
            p: 0.5,
          }}
        >
          {icon}
        </Box>
      )}
      {/* <CardMedia
        component="img"
        sx={{ width: 100, height: 100 }}
        image={
          imageSrc || "../assets/icons/image_55c1bcc7-removebg-preview.png"
        }
        alt="Total Orçado"
      /> */}
      <CardContent>
        <Typography variant="h6" color={theme.palette.text.primary}>
          {title}
        </Typography>

        {loading ? (
          <Typography color={theme.palette.text.primary}>Carregando...</Typography>
        ) : (
          <Typography fontWeight="bold" color={theme.palette.text.primary}>
            {value?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
