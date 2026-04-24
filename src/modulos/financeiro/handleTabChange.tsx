"use client"

import {
    Autocomplete,
    Chip,
    TextField,
    Card,
    CardContent,
    Box,
    Tabs,
    Tab,
} from "@mui/material";

type Modo = "consolidado" | "mensal";

export interface Mes {
    label: string;
    value: number;
}

interface Props {
    modo: Modo;
    setModo: (modo: Modo) => void;

    anoSelecionado: number;
    setAnoSelecionado: (ano: number) => void;

    mesSelecionado: Mes | null;
    setMesSelecionado: React.Dispatch<React.SetStateAction<Mes | null>>;

    meses: Mes[];
}

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
                maxHeight: 100,
            }}
        >
            <CardContent>
                <Box
                    sx={{
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
                        sx={{
                            minHeight: 32,
                        }}
                    >
                        <Tab
                            label="Consolidado"
                            value="consolidado"
                            sx={{
                                minHeight: 32,
                                fontSize: "0.75rem",
                                padding: "4px 8px",
                            }}
                        />
                        <Tab
                            label="Mensal"
                            value="mensal"
                            sx={{
                                minHeight: 32,
                                fontSize: "0.75rem",
                                padding: "4px 8px",
                            }}
                        />
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