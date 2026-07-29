export interface Client{
  id: number;
  name: string;
  description: string;
  image: string;
  token?: string;
  connected: boolean;
}

export const clients : Client[] = [
  {
    id: 1,
    name: "Myflux",
    description: "Integração com o Myflux para download de pagamentos em lote.",
    image: "/assets/icons/logo_myflux.png",
    connected:false
  },
  {
    id: 2,
    name: "Sicap",
    description:
      "Integração com o Sistema Sicap para realizar processos via API.",
    image: "/assets/icons/logo_sicap_2.png",
    connected:false
  },
];
