import express from "express";
import ClienteRoutes from "./routes/ClienteRouter.js";
import AgendamentoRoutes from "./routes/AgendamentoRouter.js";
import PagamentoRoutes from "./routes/PagamentoRouter.js";
import PetRoutes from "./routes/PetRouter.js";
import ServicoRoutes from "./routes/ServicoRouter.js";
import connectDatabase from "./database/connection.js";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(['8.8.8.8', '8.8.4.4'])

const app = express();

console.log("ESTE É O SERVER.TS DA TECHSTORE");

const PORT = 3001;
connectDatabase()
app.use(express.json());

// Simple CORS middleware to allow requests from the frontend dev server
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        return res.sendStatus(200);
    }
    next();
});

console.log("Rotas carregadas");

app.use("/Cliente", ClienteRoutes);
app.use("/Agendamento", AgendamentoRoutes);
app.use("/Pagamento", PagamentoRoutes);
app.use("/Pet", PetRoutes);
app.use("/Servico", ServicoRoutes);



app.get("/", (req, res) => {
    res.json({
        message: "API está funcionando! "
    });
});


app.get("/teste", (req, res) => {
    res.send("Servidor de teste funcionando!");
});



const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});