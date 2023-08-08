import express, { Request, Response } from "express";
import cors from "cors";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 4000;
const ad = process.env.COMPANY_ADDRESS!;

app.use(cors());
app.use(express.json());

app.get("/api/transaction/ether", async (req: Request, res: Response) => {
    const address = ad;
    const chain = EvmChain.ETHEREUM;

    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
        address,
        chain,
    });

    return res.status(200).json(response.raw.result);
});
app.get("/api/transaction/usdt", async (req: Request, res: Response) => {
    const response = await Moralis.EvmApi.token.getWalletTokenTransfers({
        address: ad,
        chain: "0x1",
    });

    return res.status(200).json(response.raw.result);
});

Moralis.start({
    apiKey: process.env.MORALIS_KEY,
}).then(() => {
    app.listen(port, () => {
        console.log(`Listening for API Calls`);
    });
});
