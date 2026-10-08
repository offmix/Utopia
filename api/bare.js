import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  runtime: 'nodejs20.x',
};

export default function handler(req, res) {
  // Bare API handler
  res.status(200).json({
    message: 'Bare API',
  });
}
