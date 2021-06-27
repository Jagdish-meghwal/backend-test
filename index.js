import express from 'express'
import dbconnect from './config/dbconnect.js';
import userRoutes from './routes/users-route.js'
import classesRoutes from './routes/classes-route.js'
import participantsRoutes from './routes/participants-route.js'
import cors from 'cors'
const app = express();

dbconnect();
app.use(cors());
app.use(express.json({extended:true}));

app.use(
    '/api/users',
    userRoutes
)
app.use(
    '/api/classes',
    classesRoutes
)
app.use(
    '/api/participants',
    participantsRoutes
)
let PORT=3000;

app.listen(PORT,()=>console.log("server running at "+PORT));