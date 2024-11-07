const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU1aVGprMkZTTjJySEl5Nmprb1ptQ1h1K1A1RWhrMkorWDRXQnhuVVVXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVXV5bjljKy8yczBoV3o1RWxOUmJCbmlNaWVocmhOTWRubCtaR09PV0VHWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRlQweHlCd0NLdVd2UVBPdVFYcG0reEFpaTZ0cWhlTkMwb25qZVFzVFd3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQNzJwc1R1RGh2Y3ZETEpNK0o0aGRacU8xVnBqc2RIUFlVRnkzWStCRWdZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlJY3lHeEJTUGxHN3hzZWpqYWNBVDJxdWVTa2VKYUExZXhXMVd1QUlIa2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhVYkwvam1NNnFkc3NqWk9Ja3FLS2VQQVM0UC9MUGx3cDkwaURkREdxSDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0hZbVRYWHlLbUVLU0ZCUlowcjlTOW1aVitEcU51V2FUUk8vc2ROcEtXYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoienViZHFValZiUjg4aXZ3TTl6VlphTjlKMHR5LzRLczJnNGgyUzZkVW9oMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJEUGpEdDFqaktVRk0yN2RRYklUTTRxTWtBTGgvU2t5ZFREVGFZOCtZUTJHR2s1VGZvcGVueGF4MFNhMXNGSTNrZ2ZpaEFEcnRHb1J4UjI5dEtrM0FnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgxLCJhZHZTZWNyZXRLZXkiOiI1Q1RBNVljYUZFZ1VYQjhublFkYzFUVDFwMkdJYVlOZVZsaFg0YzhDb04wPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJkMlc4T2tudVFibS1TWjVPRFIzckNRIiwicGhvbmVJZCI6ImVjYjc2N2E5LWM3YTItNDYzOS04ODgzLTYzMjVmNTFjZWU5YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Y2JEWGdjZ1NkajZ2enNFbHFPYUo3djdJYlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVVNRGlYcTdUNTR2WWl5QlNLUW9uRjRsUE5ZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IloyMzVGTVNZIiwibWUiOnsiaWQiOiIyMzQ5MDE5NzYwMDIyOjU3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKUFhrS3dDRU9TRHRia0dHQVlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ0NXNVSDJBTXJFaWtwMWVVS2d1NDVwK21sS2l6MzNac0dOYjlEKzRlSkdZPSIsImFjY291bnRTaWduYXR1cmUiOiIzdGd0UHlwcExxVXNXYVpNNTdlaGFPNk9PdjZUTFVidjcxdVNmUnAveWhBZWpocDJmL0NidStTMC9FWjVsMktYZEh0eXdXcmowdnkrZDJZdUQ5dkpEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTzFndWVkbG5GSzUyMUhnbHFDREV2SWtOQ01VdnRrNjd0RllPaW81L2N2bGNhL3QyRFF0K0dVTFBZMzdmeE82cEVHaEhNZGRXMUx1eXh6ek5mWFdYQmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDE5NzYwMDIyOjU3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJlYkZCOWdES3hJcEtkWGxDb0x1T2FmcHBTb3M5OTJiQmpXL1EvdUhpUm0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzEwMTkyNDksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQm5iIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "2349019760022",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
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
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
