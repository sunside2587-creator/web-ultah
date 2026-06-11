const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/wishes', async (req, res) => {
  const { sender, message } = req.body;
  if (!sender || !message) {
    return res.status(400).json({ error: 'Sender and message are required' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO wishes (sender, message) VALUES (?, ?)',
      [sender, message]
    );
    res.json({ id: result.insertId, sender, message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/wishes/:id', async (req, res) => {
  const { id } = req.params;
  const { sender, message } = req.body;
  if (!sender || !message) {
    return res.status(400).json({ error: 'Sender and message are required' });
  }
  try {
    await db.query(
      'UPDATE wishes SET sender = ?, message = ? WHERE id = ?',
      [sender, message, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/wishes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM wishes WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/wishes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM wishes ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
