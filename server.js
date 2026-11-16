const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
// Підключення JSON та статичних файлів
app.use(express.json());
app.use(express.static(__dirname));
// Перевірка роботи сервера
app.get('/api', (req, res) => {
    res.json({
        message: 'Dance Studio API працює!'
    });
});
app.get('/api/bookings', (req, res) => {
    const bookings = db.prepare('SELECT * FROM bookings').all();
    res.json(bookings);
});
app.post('/api/bookings', (req, res) => {
    const { name, email, dance_style } = req.body;
    if (!name || !email || !dance_style) {
        return res.status(400).json({
            error: 'Заповніть усі поля!'
        });
    }
    const result = db.prepare(
        'INSERT INTO bookings (name, email, dance_style) VALUES (?, ?, ?)'
    ).run(name, email, dance_style);
    res.status(201).json({
        message: 'Заявку успішно створено!',
        id: result.lastInsertRowid
    });
});
app.put('/api/bookings/:id', (req, res) => {
    const { name, email, dance_style } = req.body;
    const result = db.prepare(
        'UPDATE bookings SET name = ?, email = ?, dance_style = ? WHERE id = ?'
    ).run(name, email, dance_style, req.params.id);
    res.json({ message: 'Заявку оновлено!' });
});
app.delete('/api/bookings/:id', (req, res) => {
    const result = db.prepare(
        'DELETE FROM bookings WHERE id = ?'
    ).run(req.params.id);
    if (result.changes === 0) {
        return res.status(404).json({
            error: 'Заявку не знайдено!'
        });
    }
    res.json({ message: 'Заявку видалено!' });
});
// Запуск сервера
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущено на порту ${PORT}`);
});