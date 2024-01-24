import {promises as fs} from 'fs';
import * as crypto from 'crypto';
import {IMessages, MessageWithoutID} from "./types";
import {DiffieHellmanGroup} from "crypto";

const fileName = './db.json';
let data: IMessages[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async addMessageToJson(message: MessageWithoutID) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const newMessage = {...message, id, date}

        data.push(newMessage);
        await this.save();

        return newMessage;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    },
    async getMessages() {
        return data;
    },
    getByQueryDatetime(datetime: Date): IMessages[] {
        let lastMessages: IMessages[] = [];

        data.forEach(message => {
            if (new Date(message.date) > datetime) {
                lastMessages.push(message);
            }
        });

        return lastMessages;
    },
};

export default fileDb;

