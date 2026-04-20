import {
    Autocomplete,
    Chip,
    TextField,
    Typography,
    Card,
    CardContent,
    Box,
    ToggleButtonGroup,
    ToggleButton,
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
    const handleModoChange = (
        event: React.MouseEvent<HTMLElement>,
        newModo: Modo | null,
    ) => {
        if (newModo !== null) {
            setModo(newModo);
            if (newModo === "consolidado") {
                setMesSelecionado(null);
            } else if (newModo === "mensal" && !mesSelecionado) {
                setMesSelecionado(meses[0]);
            }
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
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2} // Margin-bottom para separar do conteúdo abaixo
                >
                    <Typography fontWeight={600}>
                        Filtro de Período
                    </Typography>
                    <ToggleButtonGroup
                        value={modo}
                        exclusive
                        onChange={handleModoChange}
                        aria-label="Modo de Visualização"
                        size="small"
                    >
                        <ToggleButton value="consolidado" aria-label="consolidado">
                            Consolidado
                        </ToggleButton>
                        <ToggleButton value="mensal" aria-label="mensal">
                            Mensal
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                {modo === "mensal" ? (
                    <Box display="flex" alignItems="center" gap={1}>
                        <Chip label={anoSelecionado} color="primary" />
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