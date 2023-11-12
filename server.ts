import express, { Request, Response } from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (request: Request, response: Response) => {
  response.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env['PORT'] || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
