import { create } from "zustand";

type Level = "grupo" | "subgrupo" | "rubrica";

interface DrillState {
  level: Level;
  grupoId: string | null;
  subgrupoId: string | null;

  grupoDescricao?: string;
  subgrupoDescricao?: string;

  drillDownGrupo: (id: string, descricao: string) => void;
  drillDownSubgrupo: (id: string, descricao: string) => void;
  
  voltar: () => void;
  reset: () => void;
}

export const useDrillStore = create<DrillState>((set) => ({
  level: "grupo",

  grupoId: null,
  subgrupoId: null,
  grupoDescricao: undefined,
  subgrupoDescricao: undefined,

  drillDownGrupo: (id, descricao) =>
    set({
      grupoId: id,
      grupoDescricao: descricao,
      level: "subgrupo",
      subgrupoId: null,
      subgrupoDescricao: undefined,
    }),

  drillDownSubgrupo: (id, descricao) =>
    set({
      subgrupoId: id,
      subgrupoDescricao: descricao,
      level: "rubrica",
    }),

  voltar: () =>
  set((state) => {
    if (state.level === "rubrica") {
      return {
        level: "subgrupo",
        subgrupoId: null,
        subgrupoDescricao: undefined,
      };
    }

    if (state.level === "subgrupo") {
      return {
        level: "grupo",
        grupoId: null,
        grupoDescricao: undefined,
        subgrupoId: null,           
        subgrupoDescricao: undefined, 
      };
    }

    return state;
  }),

  reset: () =>
    set({
      level: "grupo",
      grupoId: null,
      subgrupoId: null,
      grupoDescricao: undefined,
      subgrupoDescricao: undefined,
    }),
}));