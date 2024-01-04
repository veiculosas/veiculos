export const Detran = async(placa, renavam, uf) => {

    if(uf === 'sc'){
        window.open(`https://consultas.detrannet.sc.gov.br/servicos/consultaveiculo.asp?placa=${placa}&renavam=${renavam}`);
    }
    else if (uf === 'pr')
    {
        await navigator.clipboard.writeText(renavam);
        window.open('https://www.extratodebito.detran.pr.gov.br/detranextratos/geraExtrato.do?action=iniciarProcesso');
    };
    return
};