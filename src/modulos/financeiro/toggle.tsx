"use client";

import {
    Autocomplete,
    Chip,
    Switch,
    TextField,
    Typography,
    Stack,
    Card,
    CardContent,
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
    const handleToggleModo = () => {
        const novoModo = modo === "consolidado" ? "mensal" : "consolidado";

        if (novoModo === "consolidado") {
            setMesSelecionado(null);
        }

        if (novoModo === "mensal" && !mesSelecionado) {
            setMesSelecionado(meses[0]);
        }

        setModo(novoModo);
    };

    return (
        <Card
            sx={{
                height: "100%", // 🔥 faz igualar altura no Grid
                borderRadius: "16px",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <CardContent>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight={600}>
                            {modo === "consolidado" ? "Visão Consolidada" : "Visão Mensal"}
                        </Typography>

                        <Switch checked={modo === "consolidado"} onChange={handleToggleModo} />
                    </Stack>

                    {modo === "mensal" ? (
                        <Stack direction="row" spacing={1} alignItems="center">
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
                        </Stack>
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
                </Stack>
            </CardContent>
        </Card>
    );
};