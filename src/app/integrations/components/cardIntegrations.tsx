"use client"

import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import LoginIcon from "@mui/icons-material/Login";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

interface CardIntegrationsProps{
    connected : boolean;
    onOpen: () => void;
}

export const CardIntegrations = ({connected, onOpen}: CardIntegrationsProps) => {

    return (
        <Card sx={{
            background:
                "linear-gradient(135deg,#3348e2 0%,#4f63ff 100%)",
            display: "flex",
            borderRadius: 4,
            boxShadow: 4,
            padding: "10px",
            alignItems: "center",
            justifyContent: "center",
        }
        }
        >
            <CardMedia
                component="img"
                image="/assets/icons/logo_myflux.png"
                alt="Myflux"
                sx={{
                    width: 150,
                    height: 150,
                    objectFit: "contain",
                    margin: "4px",
                }}
            />
            <Box>
                <CardContent>
                    <Typography variant="h4" textAlign={"center"} color={"#fff"}>
                        Myflux
                    </Typography>
                    <Typography variant="body1" color={"#fff"}>
                        Integração com o Myflux para download de pagamentos em lote.
                    </Typography>
                </CardContent>
                    <CardActions
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            size="large"
                            variant="contained"
                            color={connected ? "success" : "primary"}
                            startIcon={connected ? <TaskAltIcon /> : <LoginIcon /> }
                            sx={{ borderRadius: 10, px: 4, py: 1 }}
                            onClick={onOpen}
                        >
                            {connected ? "Conectado" : "Login"}
                        </Button>
                    </CardActions>
            </Box>
        </Card >
    )
}