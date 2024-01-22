import { homedir } from "os";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../bugs_data/prod_bugs.json");


const saveBugsData = async (bugsData) => {

    await fs.promises.writeFile(filePath, JSON.stringify(bugsData));
}

export {saveBugsData}

