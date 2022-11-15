import express from 'express';
import cors from 'cors';

const app = express();
const port = 5200;

app.use(cors());
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
