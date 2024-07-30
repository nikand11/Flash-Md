const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE83MWF3MndlcWdJMkFqN09meEwwUzA1TVpQSkVrUVVWY1A4bnAxTEVtQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidTdlbWZYNUdtOGo2SGppK0M5YzRHZkpFZmJGQ3djREJSdFY1elRaMFpqUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2QmFUZFVtSWJqcHFWbUZDMjA5aVp0M0FOM2xpTW51c21hWnlOeGFDMVVjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBa2xGZ084SklNT2wwS1dPaXBKWlp1R204MFFGS2dVcXdFdUlEMnZFbG1FPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFBZ3MzMTZpTldPRDBHN1U1QUNyT0dVeVh1YTBQbjlmRTk5MkdQL0tsbUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNER3c0bk9FOHRZM3FaMjVxcms3UmtHaXZneFFZcUNOd3UzaDRkOWFwR3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNFBEUXMzNHBtdWVQYnZmOGhOYWNxNEhXVS9mSmZLS05kQ05ESkpsVFdrQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiampSTzBrVVlLTXROUG1PY2JxdUpndFk5WjdaRUZKcUJwdVB1bFh1a0ZUOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkY5RlhEUFN0UGRDeGFpL3lxN0FwVXlGckJvK1NyKzBad1FQNngxZk5kd1ovVldhTXg1NTJ3NmpqemI0U0xTWjc2eDhkbEZSQXMwK2xhVWprK2JTcEF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMwLCJhZHZTZWNyZXRLZXkiOiJGcWJQZXNaZVhIQnFtWkxvaUZqczg5MWlkb1FNcXA1OHdIY1RYNk52NjVnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJrak5PM0NaZlRKU2hOT1oxVTJ4ZnBnIiwicGhvbmVJZCI6IjllNmRhYzllLTY3MjctNDY2MC1iMDFmLWZhYzA5YjIyMGY0NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5WXhvbGRQdC9MR2JRMVp3MmRHdjFwYmZFZEU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYnNCOUl2amF1Q0NzRmVwZ0VBNnRSeVBWKzBVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFMN05LTlhIIiwibWUiOnsiaWQiOiI5NDc2MDEwNTI1NjoyOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLhtIvJqsm0yaIt4bSAybThtIrhtIDJtOG0gCA6ypnKmcqc14AifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ00zbHA3OERFTUg5cExVR0dCWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjlRTWZwUEZoZzNQSWtGcnFFb29Gc1hJZzRyMjZxWi9paThMUnVydlQ0MU09IiwiYWNjb3VudFNpZ25hdHVyZSI6ImNQaGEwaDN5NzY2VXI2VnA1OGg3SzhOYWdycEZJU2wvem1NamFMNFU5V0FFd3Q1R1dGYzM3TWtSQnRJMEFUamVRTmJRMkZHSGwxbXZVUlRaVUxGZkJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0cFl5T0NoZmxVSVFRSzIwM3JRelB4VGl3VHBQYld3cW1pMHp4UjdiTFRFako3OFh0dDNXRnRxN2tOMER2eW11RHBsTkZjcThBOFF6dkp0ODJQMllBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzYwMTA1MjU2OjI4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZVREg2VHhZWU56eUpCYTZoS0tCYkZ5SU9LOXVxbWY0b3ZDMGJxNzArTlQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjIzNjc2OTV9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "🍂🖤𝗞𝗜𝗡𝗚 𝗔𝗡𝗝𝗔𝗡𝗔 𝗕𝗕𝗛 💦🥵🍂",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "94760105256", 
    A_REACT : process.env.AUTO_REACTION || 'off',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
