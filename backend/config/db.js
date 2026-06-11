const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initDB() {
  try {
    const connection = await pool.getConnection();
    
    // Create memories table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS memories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(10) NOT NULL,
        url VARCHAR(255) NOT NULL,
        caption TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create wishes table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS wishes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert dummy data for memories if empty
    const [memories] = await connection.query('SELECT COUNT(*) as count FROM memories');
    if (memories[0].count === 0) {
      await connection.query(`
        INSERT INTO memories (type, url, caption) VALUES
        ('image', 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=500&auto=format&fit=crop&q=60', 'Kejutan ulang tahun tahun lalu!'),
        ('image', 'https://images.unsplash.com/photo-1530103862676-de8892b12f20?w=500&auto=format&fit=crop&q=60', 'Liburan bareng ke pantai.'),
        ('image', 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=60', 'Momen konyol yang selalu bikin ketawa.'),
        ('image', 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&auto=format&fit=crop&q=60', 'Makan malam spesial bersama sahabat.'),
        ('image', 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500&auto=format&fit=crop&q=60', 'Piknik ceria di taman.'),
        ('image', 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&auto=format&fit=crop&q=60', 'Party time!'),
        ('image', 'https://images.unsplash.com/photo-1473280025148-643f9b0cbac2?w=500&auto=format&fit=crop&q=60', 'Kebahagiaan di wajahmu.'),
        ('image', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60', 'Konser impian!')
      `);
    }

    // Insert dummy data for wishes if empty
    const [wishes] = await connection.query('SELECT COUNT(*) as count FROM wishes');
    if (wishes[0].count === 0) {
      await connection.query(`
        INSERT INTO wishes (sender, message) VALUES
        ('Mama & Papa', 'Selamat ulang tahun sayang! Semoga panjang umur, sehat selalu, dan semua cita-citamu tercapai. We love you so much!'),
        ('Sahabat Sejatimu', 'Happy level up day! Jangan pernah berubah ya, tetap jadi bestie yang paling asik. Traktiran ditunggu bos!'),
        ('Kakak', 'HBD ya! Kurang-kurangin ngambeknya, makin dewasa, dan sukses terus buat kuliahnya.'),
        ('Teman Nongkrong', 'Selamat bertambah tua kawan! Semoga tahun ini membawa banyak rezeki dan kebahagiaan.'),
        ('Si Dia', 'Happy birthday orang spesial. Terima kasih sudah selalu ada. Semoga hari-harimu selalu seindah senyummu.')
      `);
    }

    console.log('Database connected and initialized successfully.');
    connection.release();
  } catch (err) {
    console.error('Error initializing database:', err.message);
  }
}

initDB();

module.exports = pool;
