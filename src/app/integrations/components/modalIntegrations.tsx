import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Image from "next/image";
import { useState } from "react";
import { Client } from "../clients";

interface ModalIntergrationProps {
  open: boolean;
  onClose: () => void;
  client: Client | null;
  handleConection: (data: {
    username: string;
    password: string;
    client: Client;
  }) => void;
}

export const ModalIntegrations = ({
  open,
  onClose,
  client,
  handleConection,
}: ModalIntergrationProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItens: "center",
    justifyContent: "center",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(true);

  const handleSubmit = () => {
    if (!client) return;
    handleConection({
      username,
      password,
      client,
    });
  };

  const handleTogglePassword = () => {
    setVisiblePassword((prev) => !prev);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image
            width={200}
            height={200}
            src={client ? client.image : ""}
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
            <TextField
              label="Usuario"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              type={visiblePassword ? "password" : "text"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </Box>
          <Button onClick={handleSubmit}>Conectar</Button>
        </Box>
      </Modal>
    </>
  );
};
