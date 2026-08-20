import { create } from "zustand";

interface Excedente {
    id_grupo: string;
    orcado: number;
    realizado: number;
    diferenca: number;
    perc: number;
}

interface ExcedenteState{
    excedentes: Excedente[];
    setExcedentes:(data:Excedente[])=>void;
}

export const useExcedenteStore = create<ExcedenteState>((set) => ({
    excedentes: [],
    setExcedentes: (data)=> set({
        excedentes: data
    })
}))