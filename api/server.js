import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Serve static files from main directory
app.use(express.static(path.join(__dirname, '../main')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Serve index.html for root and unmatched routes
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../main/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not found');
  }
});

// Catch-all for other routes (serve from main if file exists)
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, '../main', req.path);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else if (req.path.endsWith('.html') || req.path === '/') {
    res.sendFile(path.join(__dirname, '../main/index.html'));
  } else {
    res.status(404).send('Not found');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Utopia Light listening on port ${port}`);
});
