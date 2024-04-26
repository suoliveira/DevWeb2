const soap = require("soap");
const url = "http://localhost:3000/mdc?wsdl";

soap.createClient(url, function(err, client){
    if(err){
        console.error('Erro ao criar cliente', err);
    }else{
        const args = {x: 1200, y: 800};
        client.CalculateMDC(args, function(err, result){
            if(err){
                console.error('Erro:', err);
            }else{
                console.log('Resultado: ', result);
            }
        });
    }
});
