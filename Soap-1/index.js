const soap = require("soap");
const url = "http://www.dneonline.com/calculator.asmx?WSDL";

soap.createClient(url, function(err, client){
    if(err){
        console.error('Erro ao criar cliente', err);
    }else{
        const subtractArgs = {intA: 5, intB: 3};
        client.Subtract(subtractArgs, function(err, result){
            if(err){
                console.error('Erro subtract:', err);
            }else{
                console.log('Resultado da subtração:', result.SubtractResult);
            }
        });
    }
});
