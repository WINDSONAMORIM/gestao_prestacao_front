"use client";
import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  Paper,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import { useState } from "react";
import {
  downloadProcess,
  getToken,
  previewTable,
} from "./myFlux/integrations.myflux.service";
import TableMy from "./components/table";
import { TableResponseApi } from "@/types/apiResponse";
import { ProcessoMyflux } from "./myFlux/myFlux.types";
import { useDownloadEvents } from "./myFlux/integrations.myflux.useDownLoadEvents";
import { CardIntegrations } from "./components/cardIntegrations";
import { Client, clients } from "./clients";
import { ModalIntegrations } from "./components/modalIntegrations";

const IntegrationsPage = () => {  

  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState<TableResponseApi<ProcessoMyflux> | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client|null>(null);
  const [clientsState, setClientsState] = useState(clients);

  const hasConnected = clientsState.some(c=>c.connected)

  const handleCheck = (id: string, checked: boolean) => {
    setTableData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        data: prev.data.map((item) =>
          item.Id === id ? { ...item, check: checked } : item,
        ),
      };
    });
  };

  const myflux = clientsState.find((c) => c.id === 1);

  useDownloadEvents({ connected: myflux?.token ? true : false, setTableData });

  const handleClose = () => setOpen(false);

  const handleClient = (client: Client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const onConection = async ({username,password, client}:{username:string;password: string, client:Client}) => {
    console.log(client)
    try {
      const result = await getToken({ username, password });
      setOpen(false);
      setClientsState(prev=>prev.map(c=> c.id ===client.id?{...c, connected:true, token:result.data.token}:c))
    } catch (error) {
      console.error("Error connecting:", error);
      return;
    }  
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const result = await previewTable(file);

    setTableData(result);
  };

  const setDownload = async () => {
    if (!tableData) return;
    tableData.data.map((m)=>{
      if(m.check===true){
      console.log(m.Id)
    }})
    console.log("clientsState:",clientsState)
    if(!myflux?.token)return""
    const blob = await downloadProcess(tableData.data, myflux?.token);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "processos.zip";

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Box>
        <Typography variant="h4" textAlign={"center"}>
          Integrações
        </Typography>
        <Typography variant="h6" textAlign={"center"}>
          Conecte-se aos sistemas externos do portal
        </Typography>
        <Grid container m={2} spacing={2}>
          {clientsState.map((c) => (
            <Grid key={c.id} size={{ xs: 12, md: 3 }}>
              <CardIntegrations
                connected={c.connected}
                onOpen={() => handleClient(c)}
                client={c.name}
                description={c.description}
                image={c.image}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Divider sx={{ my: 4 }} />
      {hasConnected ? (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            m: 2,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <UploadFileIcon sx={{ fontSize: 50 }} />
          <Typography variant="h6">Upload da Planilha</Typography>
          <Typography color="text.secondary">
            Selecione o arquivo XLSX para processar
          </Typography>
          <Button
            disabled={tableData ? true : false}
            variant="contained"
            component="label"
            sx={{
              borderRadius: 4,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: 3,
              margin: 2,
            }}
          >
            Selecionar Arquivo
            <input
              hidden
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
            />
          </Button>
          <Button
            disabled={tableData ? false : true}
            variant="contained"
            component="label"
            onClick={setDownload}
            sx={{
              borderRadius: 4,
              px: 4,
              py: 1.5,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: 3,
              margin: 2,
            }}
          >
            Download Arquivos
          </Button>
        </Paper>
      ) : null}
      <ModalIntegrations
        open={open}
        onClose={handleClose}
        handleConection={onConection}
        client = {selectedClient}
      />
      
      {tableData && (
        <Box m={4} display="flex" justifyContent="center">
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              maxWidth: 1000,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <TableMy
              headers={tableData.headers}
              data={tableData.data}
              onCheck={handleCheck}
            />
          </Paper>
        </Box>
      )}
    </>
  );
}; 

export default IntegrationsPage;
