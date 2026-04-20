import {
    Autocomplete,
    Chip,
    TextField,
    Typography,
    Card,
    CardContent,
    Box,
    Tabs,
    Tab,
} from "@mui/material";

// ... (interfaces e props permanecem as mesmas)

export const FiltroPeriodo = ({
    modo,
    setModo,
    anoSelecionado,
    setAnoSelecionado,
    mesSelecionado,
    setMesSelecionado,
    meses,
}: Props) => {
    const handleTabChange = (event: React.SyntheticEvent, newValue: Modo) => {
        setModo(newValue);
        if (newValue === "consolidado") {
            setMesSelecionado(null);
        } else if (newValue === "mensal" && !mesSelecionado) {
            setMesSelecionado(meses[0]);
        }
    };

    return (
        <Card
            sx={{
                height: "100%",
                borderRadius: "16px",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        // borderBottom: 1,
                        // borderColor: "divider",
                        mb: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Tabs
                        value={modo}
                        onChange={handleTabChange}
                        aria-label="Modo de Visualização"
                    >
                        <Tab label="Consolidado" value="consolidado" />
                        <Tab label="Mensal" value="mensal" />
                    </Tabs>

                    {modo === "mensal" && (
                        <Chip label={anoSelecionado} color="primary" />
                    )}
                </Box>

                {modo === "mensal" ? (
                    <Box display="flex" alignItems="center" gap={1}>
                        <Autocomplete
                            fullWidth
                            size="small"
                            options={meses}
                            getOptionLabel={(option) => option.label}
                            value={mesSelecionado}
                            onChange={(_, v) => setMesSelecionado(v)}
                            renderInput={(params) => <TextField {...params} label="Mês" />}
                        />
                    </Box>
                ) : (
                    <Autocomplete
                        fullWidth
                        size="small"
                        options={["2026"]}
                        value={anoSelecionado.toString()}
                        onChange={(_, v) => setAnoSelecionado(Number(v) || 2026)}
                        renderInput={(params) => <TextField {...params} label="Ano" />}
                    />
                )}
            </CardContent>
        </Card>
    );
};