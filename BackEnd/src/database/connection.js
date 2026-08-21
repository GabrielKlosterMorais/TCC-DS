import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Carrega .env relativo a este arquivo (funciona independente do CWD)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Banco de dados conectado com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco:", error);
        process.exit(1);
    }
}

export default connectDatabase;
