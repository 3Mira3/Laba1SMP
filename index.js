// index.js
import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Емулюємо __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') }); // зчитуємо .env

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  // Текст беремо з .env, якщо MESSAGE закоментований або відсутній - за замовчуванням "Hello World"
  // Якщо MESSAGE не закоментований - виводимо значення з .env
  const message = process.env.MESSAGE || 'Hello World';
  res.send(`<h1>${message}</h1>`);
});

app.get('/user', (req, res) => {
  // Читаємо безпосередньо з process.env для актуального значення
  const userMessage = process.env.MESSAGE || 'User message not found';
  res.send(`<h1>${userMessage}</h1>`);
});

// Експортуємо app для тестів
export default app;

// Запускаємо сервер тільки якщо файл запускається напряму (не в тестах)
if (!process.env.JEST_WORKER_ID) {
  const server = app.listen(PORT, () => {
    console.log(`Сервер запущений на http://localhost:${PORT}`);
  });

  // Обробка сигналів для коректного завершення
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
}

