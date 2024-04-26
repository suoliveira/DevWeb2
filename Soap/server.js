const soap = require("soap");
const express = require("express")
const app = express();

const service = {
    MDCService:{
        MDCPort:{
            CalculateMDC: function(args){
                const x = args.x;
                const y = args.y;
                const mdc = calcularMDC(args.x, args.y);
                return {MDC: mdc};
            }
        }
    }
};

function calcularMDC(x, y){
    while(y !== 0){
        const temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}

const xml = require("fs").readFileSync("mdc.wsdl", "utf-8");
app.get("/mdc?wsdl", (req, res) => {
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(xml);
});

const server = app.listen(3000, () => {
    console.log("rodando servidor");
});

soap.listen(server, "/mdc", service, xml);