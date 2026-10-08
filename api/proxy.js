import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  runtime: 'nodejs20.x',
};

export default function handler(req, res) {
  const { path: urlPath } = req.query;
  const filePath = path.join(__dirname, '../main', urlPath || 'index.html');

  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8').send(content);
    } else {
      res.status(404).send('Not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
