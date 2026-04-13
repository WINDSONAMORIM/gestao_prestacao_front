import { ResumoPorGrupoResponse, TendenciaPorGrupoResponse } from "./financeiro.types";

export const getResumoPorGrupoMock: () => ResumoPorGrupoResponse = () => {
    return {
        statusCode: 200,
        success: true,
        message: "Resumo por Grupo obtido com sucesso (mock)",
        data: [{ id: "01", descricao: "PESSOAL E REFLEXO", orcado: 10606256.60, realizado: 18122606.56 },
        { id: "02", descricao: "MATERIAL DE CONSUMO", orcado: 8417036.88, realizado: 2097368.42 },
        { id: "03", descricao: "MATERIAL DE CONSUMO ASSISTENCIAL", orcado: 13225752.84, realizado: 1986297.16 },
        { id: "04", descricao: "SERVIÇOS DE TERCEIROS", orcado: 14628269.32, realizado: 26410705.76 },
        { id: "05", descricao: "MANUTENCAO", orcado: 7126023.24, realizado: 1004397.00 },
        { id: "08", descricao: "LOCACAO", orcado: 12355595.40, realizado: 1566722.39 },
        { id: "09", descricao: "DESPESAS DIVERSAS", orcado: 6806641.80, realizado: 1177490.19 },
        { id: "10", descricao: "EMPRESTIMOS", orcado: 0, realizado: 279.09 },
        ]
    }
}

export const getResumoPorSubgrupoMock: () => ResumoPorGrupoResponse = () => {
    return {
        statusCode: 200,
        success: true,
        message: "Resumo por Subgrupo obtido com sucesso (mock)",
        data:
            [{ id: "01.01", descricao: "REMUNERACAO DE PESSOAL", orcado: 64189975.199999966, realizado: 15001809.129999992 },
            { id: "01.02", descricao: "BENEFICIOS", orcado: 5088000.0, realizado: 817110.0499999808 },
            { id: "01.03", descricao: "ENCARGOS E CONTRIBUICOES", orcado: 34716432.95999999, realizado: 8480430.80999989 },
            { id: "01.04", descricao: "OUTRAS DESPESAS DE PESSOAL", orcado: 3564031.6800000025, realizado: 659719.19 },
            { id: "02.01", descricao: "MATERIAL DE CONSUMO", orcado: 960000.0, realizado: 203688.54000000004 },
            { id: "02.02", descricao: "ORTESES E PROTESES", orcado: 5760000.0, realizado: 1918570.3499999961 },
            { id: "02.03", descricao: "MATERIAL DE ESCRITORIO", orcado: 830636.88, realizado: 67375.70999999998 },
            { id: "02.04", descricao: "MATERIAIS DE CONSUMO - OUTROS", orcado: 866400.0, realizado: 588487.6199999999 },
            { id: "03.01", descricao: "MATERIAL MEDICO - MEDICAMENTO", orcado: 13225752.840000002, realizado: 2213821.54 },
            { id: "04.01", descricao: "SERVICOS TERCEIRIZADOS", orcado: 49085131.32000001, realizado: 10359841.749999998 },
            { id: "04.02", descricao: "EDUCACAO CONTINUADA", orcado: 2508000.0, realizado: 435000.0 },
            { id: "04.03", descricao: "IMPOSTOS", orcado: 0.0, realizado: 3134014.529999999 },
            { id: "04.04", descricao: "SERVIÇOS ASSISTENCIAIS TERCERIZADOS", orcado: 97082954.76, realizado: 22657783.17 },
            { id: "05.01", descricao: "MANUTENCAO", orcado: 7126023.239999998, realizado: 1451432.3099999998 },
            { id: "05.02", descricao: "IMPOSTOS SOBRE MANUTENCAO", orcado: 0.0, realizado: 1440.82 },
            { id: "06.01", descricao: "OBRAS - INVESTIMENTOS", orcado: 0.0, realizado: 0.0 },
            { id: "07.01", descricao: "EQUIPAMENTO E MATERIAL PERMANENTE", orcado: 0.0, realizado: 0.0 },
            { id: "08.01", descricao: "LOCACAO", orcado: 12355595.400000006, realizado: 1956578.3000000003 },
            { id: "09.01", descricao: "UTILIDADE PUBLICA", orcado: 6806641.799999998, realizado: 1642277.6600000001 },
            { id: "09.02", descricao: "TAXAS E IMPOSTOS", orcado: 0.0, realizado: 123253.1 },
            { id: "09.03", descricao: "DESPESAS BANCARIAS", orcado: 0.0, realizado: 3091.88 },
            { id: "09.04", descricao: "OUTRAS DESPESAS", orcado: 0.0, realizado: 0.0 },
            { id: "10.01", descricao: "EMPRESTIMOS", orcado: 0.0, realizado: 279.09 }]
    }
}

export const getTendenciaPorGrupoMock: () => TendenciaPorGrupoResponse = () => {
    return {
    statusCode: 200,
    success: true,
    message: "Tendencia por Grupo obtido com sucesso (mock)",
    data: [
        { grupo: "01", mes: 1, orcado: 8967188.05, realizado: 9045452.989999982 },
        { grupo: "01", mes: 2, orcado: 8967188.05, realizado: 9077153.570000019 },
        { grupo: "01", mes: 3, orcado: 8967188.05, realizado: 6836462.619999962 },
        { grupo: "01", mes: 4, orcado: 8967188.05, realizado: 9045452.989999982 },
        { grupo: "01", mes: 5, orcado: 8967188.05, realizado: 9077153.570000019 },
        { grupo: "01", mes: 6, orcado: 8967188.05, realizado: 6836462.619999962 },
        { grupo: "01", mes: 7, orcado: 8967188.05, realizado: 9045452.989999982 },
        { grupo: "01", mes: 8, orcado: 8967188.05, realizado: 9077153.570000019 },
        { grupo: "01", mes: 9, orcado: 8967188.05, realizado: 6836462.619999962 },
        { grupo: "01", mes: 10, orcado: 8967188.05, realizado: 9045452.989999982 },
        { grupo: "01", mes: 11, orcado: 8967188.05, realizado: 9077153.570000019 },
        { grupo: "01", mes: 12, orcado: 8967188.05, realizado: 6836462.619999962 },
        { grupo: "02", mes: 1, orcado: 0, realizado: 1081199.579999999 },
        { grupo: "02", mes: 2, orcado: 0, realizado: 694221.2000000004 },
        { grupo: "02", mes: 3, orcado: 0, realizado: 1002701.4400000004 },
        { grupo: "03", mes: 1, orcado: 0, realizado: 5007778.609999999 },
        { grupo: "03", mes: 2, orcado: 0, realizado: 4803532.94 },
        { grupo: "03", mes: 3, orcado: 0, realizado: 2762351.74 },
        { grupo: "04", mes: 1, orcado: 0, realizado: 8890508.45 },
        { grupo: "04", mes: 2, orcado: 0, realizado: 8993784.51 },
        { grupo: "04", mes: 3, orcado: 0, realizado: 8342504.740000004 },
        { grupo: "05", mes: 1, orcado: 0, realizado: 506984.83 },
        { grupo: "05", mes: 2, orcado: 0, realizado: 488218.83 },
        { grupo: "05", mes: 3, orcado: 0, realizado: 457669.47 },
        { grupo: "08", mes: 1, orcado: 0, realizado: 746785.17 },
        { grupo: "08", mes: 2, orcado: 0, realizado: 662997.54 },
        { grupo: "08", mes: 3, orcado: 0, realizado: 546795.5900000001 },
        { grupo: "09", mes: 1, orcado: 0, realizado: 564007.57 },
        { grupo: "09", mes: 2, orcado: 0, realizado: 596508.88 },
        { grupo: "09", mes: 3, orcado: 0, realizado: 608106.19 },
        { grupo: "10", mes: 1, orcado: 0, realizado: 195.64 },
        { grupo: "10", mes: 3, orcado: 0, realizado: 83.45 }
    ]
    }
}