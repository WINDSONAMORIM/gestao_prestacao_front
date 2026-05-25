"use client";
import {
  Box,
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Divider,
  CardMedia,
  Grid,
  Modal,
  TextField,
  Typography,
  Input,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { useState } from "react";
import Image from "next/image";

const IntegrationsPage = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItens: 'center',
    justifyContent: 'center'
  };

  const [open, setOpen] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [connected, setConnected] = useState(false);

  const handleClose = () => setOpen(false);

  const handleOpen = () => setOpen(true);

  const handleTogglePassword = () =>{
    setVisiblePassword((prev)=>!prev)
  }

  const handleConection = () => {
    setConnected((prev)=>!prev)
  }

  return (
    <>
      <Box>
        <Typography variant="h4" textAlign={"center"}>
          Integrações
        </Typography>
        <Grid container m={2} spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card
              sx={{
                backgroundColor: "#3348e2",
                display: "flex",
                borderRadius: 10,
                padding: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
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
                {connected ? (
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
                      color="success"
                      startIcon={<TaskAltIcon />}
                      sx={{ borderRadius: 10, px: 4, py: 1 }}
                      onClick={handleOpen}
                    >
                      Conectado
                    </Button>
                  </CardActions>
                ) : (
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
                      color="primary"
                      startIcon={<LoginIcon />}
                      sx={{ borderRadius: 10, px: 4, py: 1 }}
                      onClick={handleOpen}
                    >
                      Login
                    </Button>
                  </CardActions>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Divider sx={{ my: 4 }} />
      {connected ? (
        <>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{
              borderRadius: 4,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: 3,
              margin: 2
            }}
          >
            Selecionar Arquivo
            <input hidden type="file" />
          </Button>
        </>
      ) : null}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image
            width={200}
            height={200}
            src="/assets/icons/logo_myflux.png"
            alt="Myflux Logo"
            style={{ display: "block", margin: "0 auto", padding: "2px" }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <AccountCircleIcon
              sx={{ marginRight: "20px", marginLeft: "5px" }}
            />
            <TextField label="Usuario" variant="standard" fullWidth />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <IconButton
              onClick={handleTogglePassword}
              sx={{ marginRight: "10px" }}
            >
              {visiblePassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
            <TextField
              label="Senha"
              variant="standard"
              fullWidth
              type={visiblePassword ? "password" : "text"}
            />
          </Box>
          <Button onClick={handleConection}>Conectar</Button>
        </Box>
      </Modal>
    </>
  );
};

export default IntegrationsPage;