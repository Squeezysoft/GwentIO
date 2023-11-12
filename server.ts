import express, { Request, Response } from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('url:', import.meta.url, __filename, __dirname);

app.use(express.static(__dirname));

app.get('*', (request: Request, response: Response) => {
  response.sendFile(new URL('index.html', __filename).pathname);
});

const port = process.env['PORT'] || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
