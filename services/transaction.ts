import { Request, Response } from "express";
import { getAllTransaction } from "../template/soapTemplates.ts";
import { Transaction } from "../types/transaction.js";
import util from "util";
import soapRequest from "easy-soap-request";
import xml2js from "xml2js";

const getAllTransactionHandler = async (req: Request, res: Response) => {
    let transactionReq: Transaction[];
    const page = parseInt(req.query.page as string);
    const xml = util.format(getAllTransaction.template, page);
    try{
        const { response } = await soapRequest({
            url: getAllTransaction.url,
            headers: getAllTransaction.headers,
            xml: xml,
        });
        const { headers, body, statusCode } = response;
        const parser = new xml2js.Parser();
        parser.parseString(body, async (err: any, result: any) => {
            const data = result["S:Envelope"]["S:Body"][0]["ns2:getAllTransactionResponse"][0]["return"][0];
            try{
                transactionReq = JSON.parse(data).data;
            } catch {
                transactionReq = [];
            }
            res.status(200).json({
                message: "transaction retrieved",
                data: transactionReq,
            });
        });
    } catch (err){
        res.status(500).json({
            message: "Error" + err,
            data: [],
        })
    }
}

export { getAllTransactionHandler };