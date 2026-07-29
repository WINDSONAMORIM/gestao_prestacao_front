export interface ProcessoMyflux{
    Seq: string;
    Id: string;
    status?: "pendente"
          | "baixando"
          | "concluido"
          | "erro";
    validaPedido?:boolean;  
    check:boolean;    
}

export interface IconProcessoMyflux {
  Seq: string;
  Id: string;
  status?: "pendente"
          | "baixando"
          | "concluido"
          | "erro";
}