// tests/app.test.js
import request from 'supertest';
import { jest } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';

// Емулюємо __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Завантажуємо наш сервер для тестів
const { default: app } = await import('../index.js');

describe('GET /', () => {
  it('повинен повертати Hello World', async () => {
    const response = await request(app).get('/').expect(200);
    
    // Перевіряємо, що сервіс повертає Hello World
    expect(response.text).toContain('Hello World');
  });
});

