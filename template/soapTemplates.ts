import { SoapEndpoint } from "../types/request.ts";

const url = "http://host.docker.internal:8081/ws/transaction";
const headers = {
    "Content-Type": "text/xml;charset=UTF-8",
    "X-API-Key": "rest",
}

const getAllTransactionWsdl = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <getAllTransaction xmlns="http://service.saranghaengbok.org/">
          <page>%d</page>
        </getAllTransaction>
      </soap:Body>
    </soap:Envelope>`;

const getAllTransaction: SoapEndpoint = {
    url: url,
    template: getAllTransactionWsdl,
    headers: headers,
}

export { getAllTransaction }; 