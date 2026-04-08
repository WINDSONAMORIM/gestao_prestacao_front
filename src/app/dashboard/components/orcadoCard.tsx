"use client";

import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type OrcadoCardProps = {
  // callback: () => { value: number | null; loading: boolean };
  callback: { value: number | null; loading: boolean };
  title: string;
  backgroundColor?: string;
  imageSrc?: string;
};

export const OrcadoCard = ({ callback, title, backgroundColor, imageSrc }: OrcadoCardProps) => {
  // const { value, loading } = callback();
  const { value, loading } = callback;

  return (
    <Card
      sx={{
        borderRadius: "16px",
        boxShadow: 3,
        display: "flex",
        alignItems: "center",
        backgroundColor: backgroundColor || "background.paper" ,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100 }}
        image={imageSrc || "../assets/icons/image_55c1bcc7-removebg-preview.png"}
        alt="Total Orçado"
      />
      <CardContent>
        <Typography variant="h6" color="white">
          {title}
        </Typography>

        {loading ? (
          <Typography color="white">
            Carregando...
          </Typography>
        ) : (
          <Typography fontWeight="bold" color="white">
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
