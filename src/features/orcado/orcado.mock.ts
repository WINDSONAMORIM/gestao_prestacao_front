import { OrcadoTotalResponse } from "./orcado.types";

export const getTotalOrcadoMock: () => OrcadoTotalResponse = () => {
  return {
    statusCode: 200,
    success: true,
    message: "Total orçado obtido com sucesso (mock)",
    data: {
      total: 12345.67,
    },
  };
};
