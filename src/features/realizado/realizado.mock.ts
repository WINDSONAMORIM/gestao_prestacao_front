import { RealizadoTotalResponse } from "./realizado.types";

export const getRealizadoTotalMock: () => RealizadoTotalResponse = () => {
  return {
    statusCode: 200,
    success: true,
    message: "Total realizado obtido com sucesso (mock)",
    data: {
      total: 9876.54,
    },
  };
}   