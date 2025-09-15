import express from 'express';
import eventsRouter from './routes/events.js';
import nudgeRouter from './routes/nudge.js';
import { connectDb } from './controllers/connectDb.js';


const app = express();

app.use(express.json());


const PORT = process.env.PORT || 5000;



app.get('/', (req, res) => {
    res.send('DeepThought Assignment Task for Backend Developer');
});

app.use('/api/v3/app', eventsRouter);
app.use('/api/v3/app', nudgeRouter);


connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on : http://localhost:${PORT}`);
    });
});

