-- Buat database jika belum ada (opsional, sesuaikan dengan nama database Aiven Anda jika perlu)
-- CREATE DATABASE IF NOT EXISTS defaultdb;
-- USE defaultdb;

-- ==========================================
-- Tabel: wishes (Untuk halaman dinding ucapan)
-- ==========================================
CREATE TABLE IF NOT EXISTS wishes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Dummy Data: wishes
-- ==========================================
INSERT INTO wishes (sender, message) VALUES
('Mama & Papa', 'Selamat ulang tahun sayang! Semoga panjang umur, sehat selalu, dan semua cita-citamu tercapai. We love you so much!'),
('Sahabat Sejatimu', 'Happy level up day! Jangan pernah berubah ya, tetap jadi bestie yang paling asik. Traktiran ditunggu bos!'),
('Kakak', 'HBD ya! Kurang-kurangin ngambeknya, makin dewasa, dan sukses terus buat kuliahnya.'),
('Teman Nongkrong', 'Selamat bertambah tua kawan! Semoga tahun ini membawa banyak rezeki dan kebahagiaan.'),
('Si Dia', 'Happy birthday orang spesial. Terima kasih sudah selalu ada. Semoga hari-harimu selalu seindah senyummu.');
