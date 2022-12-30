import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Connected');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
