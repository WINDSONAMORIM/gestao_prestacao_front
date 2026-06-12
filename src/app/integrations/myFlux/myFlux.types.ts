export interface ProcessoMyflux{
    Seq: string;
    Id: string;
    status?: "pendente"
          | "baixando"
          | "concluido"
          | "erro";
}

export interface IconProcessoMyflux {
  Seq: string;
  Id: string;
  status?: "pendente"
          | "baixando"
          | "concluido"
          | "erro";
}