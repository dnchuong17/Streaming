import express, { Application } from 'express';
import cors from 'cors';
import rootRoute from "./routes/rootRoute";

const app: Application = express();

app.use(cors());
app.use(express.static('.'));
app.use(express.json());
app.use(rootRoute);

const port = process.env.PORT || 3002;

app.listen(3002, () => {
    console.log(`Server is running on port: ${port}`);
});
