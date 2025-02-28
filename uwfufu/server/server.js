import express from "express";
import session from "express-session";
import cors from "cors";
import router from "./routes/routes.js";
import { createTable } from './database/connection.js'
import path, { dirname } from "path";
import { fileURLToPath } from 'url';

const app = express();
const port = 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

createTable();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors({
    origin: 'http://188.47.93.39:3000', 
    methods: ['GET', 'POST'],
    credentials: true,  
    secure: false
}));

app.use(session({
    secret: 'halabarda123',
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    }
}));

app.use(router);

app.get('/', (req, res) => {
    console.log(req.session.id);
    req.session.visited = true;
    return res.send('Hello World')
})

app.get('/uploads/:image', (req, res) => {
    res.sendFile(path.join(__dirname, 'uploads', req.params.image));
});

app.listen(port,"0.0.0.0", () => {
    console.log(`Server runs on port ${port}`);
})