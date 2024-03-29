const wump = require("wumpfetch");
const endpoint = "https://bots.tazhys.productions/api";
/*
 * name BotListAPI (DBRAPI)
 * author ᴮᵉᵗᵗᵉʳ ᴼᶠᶠ ᴳᵒⁿᵉ#0869
 * version 1.1.8
 * description: Custom BotListAPI For DBR, updated to get widgets of bots.
 */
module.exports = class DBR {
    constructor(botid, token) {
        this.token = token;
        this.botid = botid;
    }

    postStats(servercount) {
        if (!this.token) {
            throw new TypeError("[Token-Missing]: API token not provided");
        }
        if (!this.botid) {
            throw new Error("[BotID-Missing]: Bot ID must be specified.");
        }
        if (!servercount) {
            throw new Error("[ServerCount-Missing]: Server count must be specified.");
        }
        if (isNaN(servercount)) {
            throw new Error("[ServerCount-NaN]: Server count must be a number.");
        }
        return new Promise(async (resolve, reject) => {
            
                const res = await wump(`${endpoint}/bots/${this.botid}/stats`, {
                    method: "POST",
                    headers: {
                        "Authorization": this.token
                    },
                    data: {
                        "server_count": servercount
                    }
                }).send();
                if (!res) {
                    reject(new Error("[Error]: Bot statistics failed to update."));
                }
                resolve(`[Success]: Bot statistics have been updated to Guild Count: ${servercount}`);    
        });
    }


    getWidget() {
        if (!this.botid) {
            throw new Error("[BotID-Missing]: Bot ID must be specified.");
        }
        if (isNaN(this.botid)) {
            throw new Error("[BotID-NaN]: Bot ID must be a number.");
        }
        return new Promise(async (resolve, reject) => {
            const res = await wump(`${endpoint}/widget/${this.botid}.png`, {
                method: "GET",
            }).send();
            if (!res) {
                reject(new Error("[Error]: Widget-GET failed to retrieve the Widget-Link."));
            }
            resolve(`[Success]: Widget-Link: ${endpoint}/widget/${this.botid}.png`);
        });
    }
};
