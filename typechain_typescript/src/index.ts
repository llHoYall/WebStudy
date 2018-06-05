import * as CryptoJS from "crypto-js";

class Block {
    public index: number;
    public hash: string;
    public prev_hash: string;
    public timestamp: number;
    public data: string;    

    constructor(index: number, hash: string, prev_hash: string, timestamp: number, data: string) {
        this.index = index;
        this.hash = hash;
        this.prev_hash = prev_hash;
        this.timestamp = timestamp;
        this.data = data;
    }

    static calculateBlockHash = (index: number, prev_hash: string, timestamp: number, data: string): string => 
        CryptoJS.SHA256(index + prev_hash + timestamp + data).toString();
}

const genesis_block: Block = new Block(0, "11111111", "", 123456, "Hello");

let blockchain: Block[] = [genesis_block];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const prev_block: Block = getLatestBlock();
    const new_index: number = prev_block.index + 1;
    const new_timestamp: number = getNewTimestamp();
    const new_hash: string = Block.calculateBlockHash(new_index, prev_block.hash, new_timestamp, data);
    const new_block: Block = new Block(new_index, new_hash, prev_block.hash, new_timestamp, data);
    return new_block;
}

export {};